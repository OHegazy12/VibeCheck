//
//  NotificationViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 3/28/23.
//

import UIKit
import Parse

class NotificationViewController: UIViewController, UITableViewDelegate, UITableViewDataSource
{
    
    @IBOutlet weak var tableView: UITableView!
    var notifications: [PFObject] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.delegate = self
        tableView.dataSource = self
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(didLikePost(_:)), name: NSNotification.Name("PostLikedByOtherUser"), object: nil)
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(madeCommentOnPost(_:)), name: NSNotification.Name("CommentMade"), object: nil)
        
        
        let notificationClass = PFObject(className: "Notification")
        notificationClass["user"] = PFUser.current()
        notificationClass["fromUser"] = PFUser.current()
        notificationClass["post"] = PFObject(className: "Post")
        notificationClass.saveInBackground { (success, error) in
            if success {
                print("Notification class created successfully")
            } else if let error = error {
                print("Error creating notification class: \(error.localizedDescription)")
            }
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        
        let query = PFQuery(className: "Notification")
        query.whereKey("user", equalTo: PFUser.current()!)
        query.includeKey("fromUser")
        query.includeKey("post")
        query.order(byDescending: "createdAt")
        query.findObjectsInBackground { (objects, error) in
            if let error = error {
                print("Error querying for notifications: \(error.localizedDescription)")
            } else if let notifications = objects {
                self.notifications = notifications
                self.tableView.reloadData()
            }
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return notifications.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let cell = tableView.dequeueReusableCell(withIdentifier: "NotificationCell", for: indexPath) as! NotificationCell
        
        let notification = notifications[indexPath.row]
        let fromUser = notification["fromUser"] as! PFUser
        let post = notification["post"] as? PFObject
        
        cell.usernameLabel.text = fromUser.username
        
        if let username = fromUser.username, let post = post {
            if let likes = post["likes"] as? [PFObject], let liker = likes.first(where: { $0["liker"] as? String == fromUser.objectId }),
               post["user"] as? String == PFUser.current()?.objectId {
                cell.messageLabel.text = "You liked your own post."
            } else if let comments = post["comments"] as? [PFObject], let commenter = comments.first(where: { $0["commenter"] as? String == fromUser.objectId }) {
                cell.messageLabel.text = "You liked \(username)'s post."
            } else if let _ = notification["comment"] {
                cell.messageLabel.text = "Someone commented on your post."
            } else {
                cell.messageLabel.text = "Someone liked your post!"
            }
        }
        
        return cell
    }
    
    
    
    @objc func didLikePost(_ notification: Notification)
    {
        guard let post = notification.object as? PFObject,
              let postOwner = post["user"] as? PFUser,
              let liker = notification.userInfo?["liker"] as? PFUser,
              postOwner.objectId != liker.objectId,
              postOwner.objectId == PFUser.current()?.objectId else
        {
            return
        }
        
        let notificationObject = PFObject(className: "Notification")
        notificationObject["user"] = postOwner
        notificationObject["fromUser"] = liker
        notificationObject["post"] = post
        
        if postOwner.objectId == PFUser.current()?.objectId {
            notificationObject["message"] = "Someone liked your post!"
        }
        
        notificationObject.saveInBackground { (success, error) in
            if success
            {
                print("Successfully created notification")
            } else if let error = error
            {
                print("Error creating notification: \(error.localizedDescription)")
            }
        }
    }
    
    @objc func madeCommentOnPost(_ notification: Notification)
    {
        guard let comment = notification.object as? PFObject,
              let post = comment["post"] as? PFObject,
              let postOwner = post["user"] as? PFUser,
              let commenter = notification.userInfo?["commenter"] as? PFUser,
              postOwner.objectId != commenter.objectId,
              postOwner.objectId == PFUser.current()?.objectId else
        {
            return
        }
        
        let notificationObject = PFObject(className: "Notification")
        notificationObject["user"] = postOwner
        notificationObject["fromUser"] = commenter
        notificationObject["post"] = post
        
        if postOwner.objectId == PFUser.current()?.objectId {
            notificationObject["message"] = "Someone left a comment on your post!"
        }
        
        notificationObject.saveInBackground { (success, error) in
            if success
            {
                print("Successfully created notification")
            } else if let error = error
            {
                print("Error creating notification: \(error.localizedDescription)")
            }
        }
    }
    
    deinit
    {
        NotificationCenter.default.removeObserver(self)
    }
}

//
//  FeedViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse
import AlamofireImage
import MessageInputBar

class FeedViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, MessageInputBarDelegate
{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        let post = posts[section]
        let comments = (post["comments"] as? [PFObject]) ?? []
               
        return comments.count + 2
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return posts.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let post = posts[indexPath.section]
        let comments = (post["comments"] as? [PFObject]) ?? []
                
                
        let cell = tableView.dequeueReusableCell(withIdentifier: "PostCell") as! PostCell
                
        if indexPath.row == 0
        {
                
            let user = post["author"] as! PFUser
            cell.usernameLabel.text = user.username
                
            cell.captionLabel.text = post["caption"] as! String
                
            let imageFile = post["image"] as! PFFileObject
            let urlString = imageFile.url!
            let url = URL(string: urlString)!
                
            cell.postImageView.af_setImage(withURL: url)
                
            return cell
                
        }
            else if indexPath.row <= comments.count
            {
                let cell = tableView.dequeueReusableCell(withIdentifier: "CommentCell") as! CommentCell
                    
                let comment = comments[indexPath.row - 1]
                cell.commentLabel.text = comment["text"] as? String
                    
                let user = comment["author"] as! PFUser
                cell.nameLabel.text = user.username
                    
                return cell
            }
            else
              {
                let cell = tableView.dequeueReusableCell(withIdentifier: "AddCommentsCell")!
                return cell
               }
    }
    
    @IBOutlet weak var tableView: UITableView!
    let commentBar = MessageInputBar()
    var showsCommentBar = false
    var posts = [PFObject]()
    var selectedPost: PFObject!
    
    
    override func viewDidLoad() {
            super.viewDidLoad()
            
            commentBar.inputTextView.placeholder = "Add a comment..."
            commentBar.sendButton.title = "Post"
            commentBar.delegate = self
            
            tableView.delegate = self
            tableView.dataSource = self
            
            tableView.keyboardDismissMode = .interactive

            let center = NotificationCenter.default
            center.addObserver(self, selector: #selector(keyboardWillBeHidden(note:)), name: UIResponder.keyboardWillHideNotification, object: nil)
            // Do any additional setup after loading the view.
        }
        
        @objc func keyboardWillBeHidden(note: Notification)
        {
            commentBar.inputTextView.text = nil
            showsCommentBar = false
            becomeFirstResponder()
        }
        
        override var inputAccessoryView: UIView? {
            return commentBar
        }
        
        override var canBecomeFirstResponder: Bool {
            return showsCommentBar
        }
        
        func messageInputBar(_ inputBar: MessageInputBar, didPressSendButtonWith text: String) {
            // Create the comment
            let comment = PFObject(className: "Comments")
            comment["text"] = text
            comment["post"] = selectedPost
            comment["author"] = PFUser.current()!
            
            selectedPost.add(comment, forKey: "Comments")
            
            selectedPost.saveInBackground {(success, error) in
                if success
                {
                    print("Comment saved")
                }
                else
                {
                    print("Error saving comment")
                }
            }
            
            tableView.reloadData()
            
            //Clear and dismiss the input bar
                commentBar.inputTextView.text = nil
                showsCommentBar = false
                becomeFirstResponder()
                commentBar.inputTextView.resignFirstResponder()
        }
        
        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            
            let query = PFQuery(className:"Posts")
            query.includeKeys(["author", "comments", "comments.author"])
            query.limit = 20
            
            query.findObjectsInBackground { (posts, error) in
                if posts != nil
                {
                    self.posts = posts!
                    self.tableView.reloadData()
                }
            }
        }
    
    // Allows user to log out of the application.
    @IBAction func onLogOut(_ sender: Any)
    {
        PFUser.logOut()
        
        let main = UIStoryboard(name: "Main", bundle: nil)
        let loginVC = main.instantiateViewController(withIdentifier: "LoginViewController")
        let delegate = self.view.window?.windowScene?.delegate as! SceneDelegate
        delegate.window?.rootViewController = loginVC
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           let post = posts[indexPath.section]
           let comments = (post["Comments"] as? [PFObject]) ?? []
          
           if indexPath.row == comments.count + 1
           {
               showsCommentBar = true
               becomeFirstResponder()
               commentBar.inputTextView.becomeFirstResponder()
               
               selectedPost = post
           }
           
   }
}

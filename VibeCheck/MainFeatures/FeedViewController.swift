//
//  FeedViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse
import AlamofireImage

class FeedViewController: UIViewController, UITableViewDelegate, UITableViewDataSource
{
    // Displays the posts as scrollable rows.
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        let post = posts[section]
        let comments = (post["comments"] as? [PFObject]) ?? []
               
        return comments.count + 2
    }
    
    // However many number of posts exist, the app shows.
    func numberOfSections(in tableView: UITableView) -> Int
    {
        return posts.count
    }
    
    // Allows users to go to comments section by tapping on the post itself.
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath)
    {
        if indexPath.row == 0
        {
            let commentVC = storyboard?.instantiateViewController(withIdentifier: "CommentViewController") as! CommentViewController
            commentVC.postObject = posts[indexPath.section]
            present(commentVC, animated: true, completion: nil)
        }
    }
    
    // Displays the posts' properties, such as username, caption, and image. 
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
             cell.commentTextLabel.text = comment["text"] as? String
         
             let user = comment["author"] as! PFUser
             cell.nameLabel.text = user.username
         
             return cell
         }
        
         else
         {
             let cell = tableView.dequeueReusableCell(withIdentifier: "InteractionCell")!
             return cell
         }
    }
    
    @IBOutlet weak var tableView: UITableView!
    var posts = [PFObject]()
    var postObject: PFObject?

    
    override func viewDidLoad()
    {
            super.viewDidLoad()
            
            tableView.delegate = self
            tableView.dataSource = self
            
            tableView.keyboardDismissMode = .interactive

            let center = NotificationCenter.default
            // Do any additional setup after loading the view.
        }
        
    override func viewDidAppear(_ animated: Bool)
    {
        super.viewDidAppear(animated)
            
        // Creates a Posts class to store all posts in database.
        let query = PFQuery(className:"Posts")
        query.includeKeys(["author", "comments", "comments.author"])
        query.limit = 20
            
        query.findObjectsInBackground
        { (posts, error) in
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

    
}

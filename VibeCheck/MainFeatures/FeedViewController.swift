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
    
    // Displays the posts' properties, such as username, caption, comments, likes/dislikes and image associated with the post.
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let post = posts[indexPath.section]
        let comments = (post["comments"] as? [PFObject]) ?? []
        
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "PostCell") as! PostCell
        
        
        if (indexPath.row == 0)
         {
             let user = post["author"] as? PFUser
             cell.usernameLabel.text = user?.username
         
             cell.captionLabel.text = post["caption"] as? String
         
             let imageFile = post["image"] as! PFFileObject
             let urlString = imageFile.url!
             let url = URL(string: urlString)!
         
             cell.postImageView.af.setImage(withURL: url)
         
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
            let cell = tableView.dequeueReusableCell(withIdentifier: "InteractionCell") as! InteractionCell
            cell.likeButton.tag = indexPath.section
            cell.likeButton.addTarget(self, action: #selector(likeButtonTapped(_:)), for: .touchUpInside)
            if let likedPosts = UserDefaults.standard.array(forKey: "likedPosts") as? [String], likedPosts.contains(post.objectId ?? "")
            {
                cell.likeButton.setImage(UIImage(named: "likeButtonFilled.png"), for: .normal)
            }
            else
            {
                cell.likeButton.setImage(UIImage(named: "likeButtonEmpty.png"), for: .normal)
            }
            
            cell.dislikeButton.tag = indexPath.section
            cell.dislikeButton.addTarget(self, action: #selector(disLikeButtonTapped(_:)), for: .touchUpInside)
            if let dislikedPosts = UserDefaults.standard.array(forKey: "dislikedPosts") as? [String], dislikedPosts.contains(post.objectId ?? "")
            {
                cell.dislikeButton.setImage(UIImage(named: "dislikeButtonFilled.png"), for: .normal)
            }
            else
            {
                cell.dislikeButton.setImage(UIImage(named: "dislikeButtonEmpty.png"), for: .normal)
            }
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
        else
        {
            print("Error: \(String(describing: error?.localizedDescription))")
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

    // Allows users to like the post
    @IBAction func likeButtonTapped(_ sender: UIButton)
    {
        let point = sender.convert(CGPoint.zero, to: tableView)
        guard let indexPath = tableView.indexPathForRow(at: point) else
        {
            return
        }
        
        let post = posts[indexPath.section]
        let defaults = UserDefaults.standard
        
        let postButtonState = PostButtonState.shared
        if postButtonState.isPostDisliked(post.objectId ?? "")
        {
            print("Can't like a post you already disliked.")
            return
        }
        
        if postButtonState.isPostLiked(post.objectId ?? "")
        {
            post["likes"] = (post["likes"] as? [String])?.filter { $0 != PFUser.current()?.objectId }
            postButtonState.toggleLikeButton(forPostId: post.objectId ?? "")
            let image = UIImage(named: "likeButtonEmpty.png")
            sender.setImage(image, for: .normal)
            print("Post has been unliked")
        } else
        {
            post.addUniqueObject(PFUser.current()?.objectId ?? "", forKey: "likes")
            postButtonState.toggleLikeButton(forPostId: post.objectId ?? "")
            let image = UIImage(named: "likeButtonFilled.png")
            sender.setImage(image, for: .normal)
            animateLikeButton(button: sender)
            print("Post has been liked")
        }
        
        defaults.set(Array(postButtonState.likedPosts), forKey: "likedPosts")
        
        // Update the like button state for the current user
        if let currentUser = PFUser.current(), let likedPosts = currentUser["likedPosts"] as? [String]
        {
            if likedPosts.contains(post.objectId ?? "")
            {
                let image = UIImage(named: "likeButtonFilled.png")
                sender.setImage(image, for: .normal)
            } else
            {
                let image = UIImage(named: "likeButtonEmpty.png")
                sender.setImage(image, for: .normal)
            }
        }
        
        post.saveInBackground()
    }
    
    // Allows the user to dislike the post
    @IBAction func disLikeButtonTapped(_ sender: UIButton)
    {
        let point = sender.convert(CGPoint.zero, to: tableView)
        guard let indexPath = tableView.indexPathForRow(at: point) else
        {
            return
        }
        
        let post = posts[indexPath.section]
        let defaults = UserDefaults.standard
        let postId = post.objectId ?? ""
        let postButtonState = PostButtonState.shared
        
        if postButtonState.isPostDisliked(postId)
        {
            postButtonState.toggleDislikeButton(forPostId: postId)
            sender.setImage(UIImage(named: "dislikeButtonEmpty.png"), for: .normal)
            print("Post has been undisliked")
        } else
        {
            if postButtonState.isPostLiked(postId)
            {
                print("Can't like a post you already disliked")
                return
            }
            
            postButtonState.toggleDislikeButton(forPostId: postId)
            sender.setImage(UIImage(named: "dislikeButtonFilled.png"), for: .normal)
            animatedislikeButton(button: sender)
            print("Post has been disliked")
            
            if postButtonState.isPostLiked(postId)
            {
                postButtonState.toggleLikeButton(forPostId: postId)
                let likeButton = tableView.cellForRow(at: indexPath)?.viewWithTag(3) as! UIButton
                likeButton.setImage(UIImage(named: "likeButtonEmpty.png"), for: .normal)
            }
        }
        
        defaults.set(Array(postButtonState.dislikedPosts), forKey: "dislikedPosts")
        post.saveInBackground()
    }
    
    func animateLikeButton(button: UIButton)
    {
        UIView.animate(withDuration: 0.1, animations: { button.transform = CGAffineTransform(scaleX: 1.5, y: 1.5)}, completion:
            { _ in
                UIView.animate(withDuration: 0.1, animations:
                {
                    button.transform = CGAffineTransform.identity
                })
            })
    }
    
    func animatedislikeButton(button: UIButton)
    {
        UIView.animate(withDuration: 0.1, animations: { button.transform = CGAffineTransform(scaleX: 1.5, y: 1.5)}, completion:
        { _ in
            UIView.animate(withDuration: 0.1, animations:
            {
                button.transform = CGAffineTransform.identity
            })
        })
    }
    
    
}

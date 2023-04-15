//
//  CommentViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/28/23.
//

import UIKit
import Parse

class CommentViewController: UIViewController, UITableViewDataSource, UITableViewDelegate
{
    
    var posts = [PFObject]()
    var postObject: PFObject!
    var comments: [PFObject] = []
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        
        tableView.delegate = self
        tableView.dataSource = self
    
        // If post exists, load whatever comments it have.
        if postObject != nil
        {
            loadComments()
        }
        else
        {
            print("postObject is nil")
        }
    }
    
    // Function for loading existing comments on a given post.
    func loadComments()
    {
        guard let postObject = postObject else
        {
            print("Error: postObject is nil")
            return
        }
        
        // Query for the post object that the comments belong to
        let postQuery = PFQuery(className: "Posts")
        postQuery.whereKey("objectId", equalTo: postObject.objectId ?? "")
        
        // Creates a Comment class in database to store comments
        let query = PFQuery(className: "Comment")
        query.whereKey("post", equalTo: postObject)
        query.whereKey("post", matchesQuery: postQuery)
        query.includeKey("author")
        query.findObjectsInBackground
        { [weak self] comments, error in
            if let comments = comments
            {
                self?.comments = comments
                self?.tableView.reloadData()
            }
            else if let error = error
            {
                print("Error loading comments: \(error.localizedDescription)")
            }
        }
    }
    
    // Allows users to make a comment on a post
    @IBAction func onCreateComment(_ sender: Any)
    {
        // Creates 'Add Comment' pop up for users to type their comment in.
        let alertController = UIAlertController(title: "Add Comment", message: nil, preferredStyle: .alert)
        alertController.addTextField
        {
            textField in
            textField.placeholder = "Enter your comment here"
        }
        
        let postAction = UIAlertAction(title: "Post", style: .default)
        {
            [weak self] _ in
            
            guard let commenttext = alertController.textFields?.first?.text, !commenttext.isEmpty
                    else
            {
                let alert = UIAlertController(title: "Error", message: "Can't post an empty comment.", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                self!.present(alert, animated: true, completion: nil)
                return
            }
            
            // Updates Comment class in database whenever a new comment is made
            let newComment = PFObject(className: "Comment")
            newComment["author"] = PFUser.current() ?? NSNull() // NSNull is singleton
            newComment["text"] = commenttext
            newComment["post"] = self?.postObject ?? NSNull()
            newComment.saveInBackground
            {
                [weak self] success, error in
                if success
                {
                    self?.loadComments()
                }
                else if let error = error
                {
                    print("Error saving comment: \(error.localizedDescription)")
                }
            }
        }
        
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
        alertController.addAction(postAction)
        alertController.addAction(cancelAction)
        present(alertController, animated: true, completion: nil)
    }
    
    // Sets & updates number of comments in a given post.
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        return comments.count
    }
    
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool
    {
        return true
    }

    // Allows users to delete comments.
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath)
    {
        if editingStyle == .delete
        {
            let commentToDelete = comments[indexPath.row]
            commentToDelete.deleteInBackground
            {
                [weak self] success, error in
                if let error = error
                {
                    print("Error deleting comment: \(error.localizedDescription)")
                }
                else if success
                {
                    self?.comments.remove(at: indexPath.row)
                    tableView.deleteRows(at: [indexPath], with: .automatic)
                }
            }
        }
    }

    // Displays comments associated with each post
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        // Sets a resuable cell to CommentCell subclass
        let cell = tableView.dequeueReusableCell(withIdentifier: "CommentCell", for: indexPath) as! CommentCell
        
        // Lays out the comments in rows
        let comment = comments[indexPath.row]
        
        cell.commentTextLabel.text = comment["text"] as? String
        
        if let user = comment["author"] as? PFUser
        {
            cell.nameLabel.text = user.username
        }
        else
        {
            cell.nameLabel.text = "Unknown"
        }
        
        cell.showsReorderControl = true
        cell.selectionStyle = .none
        
        return cell
    }
}


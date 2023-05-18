//
//  CommunityPostsViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/3/23.
//

import UIKit
import Parse

class CommunityPostsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var sectionName: String!
    var posts = [[String: Any]]()
    var postsTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = sectionName
        
        setupTableView()
        queryPostsForSection()
        
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(displayAddPostAlert))
    }
    
    func setupTableView() {
        postsTableView = UITableView(frame: view.bounds, style: .plain)
        postsTableView.delegate = self
        postsTableView.dataSource = self
        postsTableView.register(CommunityPostsCell.self, forCellReuseIdentifier: "CommunityPostsCell")
        view.addSubview(postsTableView)
    }
    
    func queryPostsForSection() {
        let query = PFQuery(className: "CommunityPost")
        query.whereKey("sectionName", equalTo: sectionName)
        query.findObjectsInBackground { [weak self] (objects, error) in
            guard let self = self else { return }
            
            if let error = error {
                print("Error querying posts for section: \(error.localizedDescription)")
            } else if let objects = objects {
                self.posts = objects.compactMap { object in
                    guard let title = object["title"] as? String, let caption = object["caption"] as? String else {
                        return nil
                    }
                    return ["title": title, "caption": caption]
                }
                self.postsTableView.reloadData()
            }
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return posts.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CommunityPostsCell", for: indexPath) as! CommunityPostsCell
            let post = posts[indexPath.row]
            cell.postLabel.text = post["title"] as? String
            cell.postCaption.text = post["caption"] as? String
            return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let post = posts[indexPath.row]
        showCommentsViewController(with: post)
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    func showCommentsViewController(with post: [String: Any])
    {
        let commentsVC = CommunityPostCommentsViewController()
        commentsVC.post = post
        navigationController?.pushViewController(commentsVC, animated: true)
    }
    
    func addPost(_ post: [String: Any]) {
        posts.append(post)
        postsTableView.reloadData()
    }
    
    func createNewPost(title: String, caption: String) {
        let communityPost = PFObject(className: "CommunityPost")
        communityPost["title"] = title
        communityPost["caption"] = caption
        communityPost["sectionName"] = sectionName
        
        communityPost.saveInBackground { [weak self] (success, error) in
            if let error = error {
                print("Error saving post: \(error.localizedDescription)")
            } else {
                print("Post saved successfully")
                
                let newPost = ["title": title, "caption": caption]
                self?.addPost(newPost)
            }
        }
    }
    
    @objc func displayAddPostAlert() {
        let alert = UIAlertController(title: "Add Post", message: nil, preferredStyle: .alert)
        alert.addTextField { textField in
            textField.placeholder = "Title"
        }
        alert.addTextField { textField in
            textField.placeholder = "Caption"
        }
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        alert.addAction(UIAlertAction(title: "Add", style: .default, handler: { [weak self, weak alert] _ in
            guard let self = self, let alert = alert else {
                return
            }
            
            let titleTextField = alert.textFields?[0]
            let captionTextField = alert.textFields?[1]
            
            if let title = titleTextField?.text, let caption = captionTextField?.text, !title.isEmpty, !caption.isEmpty {
                self.createNewPost(title: title, caption: caption)
            }
        }))
        
        present(alert, animated: true, completion: nil)
    }
}



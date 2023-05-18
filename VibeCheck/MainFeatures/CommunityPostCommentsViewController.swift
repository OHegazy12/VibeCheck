//
//  CommunityPostCommentsViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/17/23.
//

import UIKit
import Parse

class CommunityPostCommentsViewController: UIViewController {

    var post: [String: Any]?

    private var commentsTableView: UITableView!
    private var comments = [[String: Any]]()

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Comments"

        setupTableView()

        if let post = post {
            fetchCommentsForPost(post)
        }

        setupAddCommentButton()
    }

    func setupTableView() {
        commentsTableView = UITableView(frame: view.bounds, style: .plain)
        commentsTableView.delegate = self
        commentsTableView.dataSource = self
        commentsTableView.register(CommunityCommentCell.self, forCellReuseIdentifier: CommunityCommentCell.identifier)
        view.addSubview(commentsTableView)
    }

    func fetchCommentsForPost(_ post: [String: Any]) {
        guard let postId = post["objectId"] as? String else {
            return
        }

        let query = PFQuery(className: "CommunityPostComments")
        query.whereKey("postId", equalTo: postId)
        query.findObjectsInBackground { [weak self] (objects, error) in
            guard let self = self else { return }

            if let error = error {
                print("Error querying comments for post: \(error.localizedDescription)")
            } else if let objects = objects {
                self.comments = objects.compactMap { object in
                    guard let commentText = object["commentText"] as? String else {
                        return nil
                    }
                    return ["commentText": commentText]
                }
                self.commentsTableView.reloadData()
            }
        }
    }

    func createComment(_ commentText: String) {
        guard let post = post,
              let postId = post["objectId"] as? String else {
            return
        }

        let commentObject = PFObject(className: "CommunityPostComments")
        commentObject["postId"] = postId
        commentObject["commentText"] = commentText

        commentObject.saveInBackground { [weak self] (success, error) in
            DispatchQueue.main.async { // Ensure UI updates on the main thread
                if let error = error {
                    print("Error saving comment: \(error.localizedDescription)")
                } else {
                    print("Comment saved successfully")

                    // Add the new comment to the comments array
                    let newComment = ["commentText": commentText]
                    self?.comments.append(newComment)

                    // Reload the table view to reflect the updated comments
                    self?.commentsTableView.reloadData()

                    // Scroll to the newly created comment
                    let indexPath = IndexPath(row: self?.comments.count ?? 0 - 1, section: 0)
                    self?.commentsTableView.scrollToRow(at: indexPath, at: .bottom, animated: true)
                }
            }
        }
    }


    func setupAddCommentButton() {
        let addButton = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(displayAddCommentAlert))
        navigationItem.rightBarButtonItem = addButton
    }

    @objc func displayAddCommentAlert() {
        let alert = UIAlertController(title: "Add Comment", message: nil, preferredStyle: .alert)
        alert.addTextField { textField in
            textField.placeholder = "Comment"
        }
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        alert.addAction(UIAlertAction(title: "Add", style: .default, handler: { [weak self, weak alert] _ in
            guard let self = self, let alert = alert else {
                return
            }

            let commentTextField = alert.textFields?.first
            if let commentText = commentTextField?.text, !commentText.isEmpty {
                self.createComment(commentText)
            }
        }))

        present(alert, animated: true, completion: nil)
    }
}

extension CommunityPostCommentsViewController: UITableViewDelegate, UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return comments.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: CommunityCommentCell.identifier, for: indexPath) as! CommunityCommentCell
        let comment = comments[indexPath.row]
        if let name = comment["name"] as? String, let commentText = comment["commentText"] as? String {
            cell.configure(withName: name, commentText: commentText)
        }
        return cell
    }

}

//
//  CommunityPostsCell.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/3/23.
//

import UIKit
import Parse

class CommunityPostsCell: UITableViewCell {
    
    let postLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0
        return label
    }()
    
    let postCaption: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0
        return label
    }()
    
    let upvoteButton: UIButton = {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setImage(UIImage(named: "upvoteEmpty"), for: .normal)
        // Configure button actions
        return button
    }()
    
    let downvoteButton: UIButton = {
        let button = UIButton()
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setImage(UIImage(named: "downvoteEmpty"), for: .normal)
        // Configure button actions
        return button
    }()
    
    // Variables to track the upvote and downvote states
    private var isUpvoted: Bool = false
    private var isDownvoted: Bool = false
    private var postId: String? // Store the post ID for reference
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        // Add subviews and setup constraints
        contentView.addSubview(postLabel)
        contentView.addSubview(postCaption)
        contentView.addSubview(upvoteButton)
        contentView.addSubview(downvoteButton)
        
        upvoteButton.addTarget(self, action: #selector(didTapUpvote), for: .touchUpInside)
        downvoteButton.addTarget(self, action: #selector(didTapDownvote), for: .touchUpInside)
        
        NSLayoutConstraint.activate([
            postLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 8),
            postLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 8),
            postLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -8),
            
            postCaption.topAnchor.constraint(equalTo: postLabel.bottomAnchor, constant: 8),
            postCaption.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 8),
            postCaption.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -8),
            
            upvoteButton.topAnchor.constraint(equalTo: postCaption.bottomAnchor, constant: 8),
            upvoteButton.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 8),
            
            downvoteButton.topAnchor.constraint(equalTo: postCaption.bottomAnchor, constant: 8),
            downvoteButton.leadingAnchor.constraint(equalTo: upvoteButton.trailingAnchor, constant: 8),
            downvoteButton.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -8),
            
            downvoteButton.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -8)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(with post: [String: Any]) {
        postLabel.text = post["title"] as? String
        postCaption.text = post["caption"] as? String
        postId = post["objectId"] as? String // Assuming "objectId" is the unique identifier for the post
        loadButtonStates()
    }
    
    func loadButtonStates() {
        guard let postId = postId else {
            return
        }
        
        let currentUser = PFUser.current()
        
        // Query the Parse server for the user's upvote/downvote for the post
        let query = PFQuery(className: "PostVotes")
        query.whereKey("postId", equalTo: postId)
        query.whereKey("userId", equalTo: currentUser)
        query.findObjectsInBackground { (votes, error) in
            if let error = error {
                print("Error loading post votes: \(error.localizedDescription)")
            } else if let votes = votes, !votes.isEmpty {
                // User has voted on the post
                if let vote = votes.first,
                   let upvoted = vote["upvoted"] as? Bool,
                   let downvoted = vote["downvoted"] as? Bool {
                    self.isUpvoted = upvoted
                    self.isDownvoted = downvoted
                    
                    // Update the button states based on the vote
                    DispatchQueue.main.async {
                        self.updateButtonStates()
                    }
                }
            }
        }
    }
    
    @objc func didTapUpvote() {
        isUpvoted.toggle()
        updateButtonStates()
        
        if let postId = postId {
            saveVoteToParse(upvoted: isUpvoted, downvoted: false, for: postId)
        }
    }
    
    @objc func didTapDownvote() {
        isDownvoted.toggle()
        updateButtonStates()
        
        if let postId = postId {
            saveVoteToParse(upvoted: false, downvoted: isDownvoted, for: postId)
        }
    }
    
    func updateButtonStates() {
        let upvoteImage = isUpvoted ? UIImage(named: "upvoteFilled") : UIImage(named: "upvoteEmpty")
        let downvoteImage = isDownvoted ? UIImage(named: "downvoteFilled") : UIImage(named: "downvoteEmpty")
        
        upvoteButton.setImage(upvoteImage, for: .normal)
        downvoteButton.setImage(downvoteImage, for: .normal)
    }
    
    func saveVoteToParse(upvoted: Bool, downvoted: Bool, for postId: String) {
        let currentUser = PFUser.current()
        
        // Query the Parse server for the user's vote on the post
        let query = PFQuery(className: "PostVotes")
        query.whereKey("postId", equalTo: postId)
        query.whereKey("userId", equalTo: currentUser)
        query.getFirstObjectInBackground { (vote, error) in
            if let error = error {
                print("Error saving post vote: \(error.localizedDescription)")
            } else if let vote = vote {
                // Update the existing vote
                vote["upvoted"] = upvoted
                vote["downvoted"] = downvoted
                vote.saveInBackground()
            } else {
                // Create a new vote object
                let vote = PFObject(className: "PostVotes")
                vote["postId"] = postId
                vote["userId"] = currentUser
                vote["upvoted"] = upvoted
                vote["downvoted"] = downvoted
                vote.saveInBackground()
            }
        }
    }
}


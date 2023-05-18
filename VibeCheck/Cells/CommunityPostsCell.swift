//
//  CommunityPostsCell.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/3/23.
//

import UIKit

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
    }
    
    @objc func didTapUpvote() {
        isUpvoted.toggle()
        let upvoteImage = isUpvoted ? UIImage(named: "upvoteFilled") : UIImage(named: "upvoteEmpty")
        upvoteButton.setImage(upvoteImage, for: .normal)
        
        if isUpvoted {
            isDownvoted = false
            downvoteButton.setImage(UIImage(named: "downvoteEmpty"), for: .normal)
        }
    }
    
    @objc func didTapDownvote() {
        isDownvoted.toggle()
        let downvoteImage = isDownvoted ? UIImage(named: "downvoteFilled") : UIImage(named: "downvoteEmpty")
        downvoteButton.setImage(downvoteImage, for: .normal)
        
        if isDownvoted {
            isUpvoted = false
            upvoteButton.setImage(UIImage(named: "upvoteEmpty"), for: .normal)
        }
    }
    
}

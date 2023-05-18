//
//  CommunityCommentCell.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/17/23.
//

import UIKit

protocol CommunityCommentCellDelegate: AnyObject {
    func didTapPostButton(comment: String)
}

class CommunityCommentCell: UITableViewCell {

    static let identifier = "CommunityCommentCell"

    weak var delegate: CommunityCommentCellDelegate?

    let nameLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = UIFont.boldSystemFont(ofSize: 16)
        return label
    }()

    let commentTextLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.numberOfLines = 0
        label.font = UIFont.systemFont(ofSize: 14)
        return label
    }()

    let commentTextField: UITextField = {
        let textField = UITextField()
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.placeholder = "Add a comment"
        textField.borderStyle = .roundedRect
        return textField
    }()

    let postButton: UIButton = {
        let button = UIButton(type: .system)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.setTitle("Post", for: .normal)
        return button
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)

        contentView.addSubview(nameLabel)
        contentView.addSubview(commentTextLabel)
        contentView.addSubview(commentTextField)
        contentView.addSubview(postButton)

        postButton.addTarget(self, action: #selector(postButtonTapped), for: .touchUpInside)

        NSLayoutConstraint.activate([
            nameLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 8),
            nameLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            nameLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),

            commentTextLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 4),
            commentTextLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            commentTextLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),

            commentTextField.topAnchor.constraint(equalTo: commentTextLabel.bottomAnchor, constant: 8),
            commentTextField.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            commentTextField.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -96),

            postButton.centerYAnchor.constraint(equalTo: commentTextField.centerYAnchor),
            postButton.leadingAnchor.constraint(equalTo: commentTextField.trailingAnchor, constant: 8)
        ])
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    @objc private func postButtonTapped() {
        if let comment = commentTextField.text, !comment.isEmpty {
            delegate?.didTapPostButton(comment: comment)
            commentTextField.text = nil
        }
    }

    func configure(withName name: String, commentText: String) {
        nameLabel.text = name
        commentTextLabel.text = commentText
    }
}

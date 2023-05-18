//
//  ProfileViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/11/23.
//

import UIKit
import Parse

class ProfileViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return posts.count
        }
    
    // Allows users to go to comments section by tapping on the post itself.
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
            let commentVC = storyboard?.instantiateViewController(withIdentifier: "CommentViewController") as! CommentViewController
            commentVC.postObject = posts[indexPath.row]
            present(commentVC, animated: true, completion: nil)
        }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 180.0 // Adjust the desired cell height as needed
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let post = posts[indexPath.row]
        let comments = (post["comments"] as? [PFObject]) ?? []

        // Remove any existing subviews from the cell's contentView
        cell.contentView.subviews.forEach { $0.removeFromSuperview() }

        // Set the image for the post
        if let imageFile = post["image"] as? PFFileObject {
            imageFile.getDataInBackground { (data, error) in
                if let error = error {
                    print("Error fetching post image: \(error.localizedDescription)")
                    return
                }

                if let data = data, let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        let aspectRatio = image.size.width / image.size.height
                        let targetHeight: CGFloat = 150.0 // Adjust the desired height as needed
                        let targetWidth = targetHeight * aspectRatio
                        let resizedImage = image.resizedImage(with: CGSize(width: targetWidth, height: targetHeight))

                        let imageView = UIImageView(image: resizedImage)
                        imageView.contentMode = .scaleAspectFit
                        imageView.translatesAutoresizingMaskIntoConstraints = false
                        cell.contentView.addSubview(imageView)

                        // Center the image view horizontally within the cell's contentView
                        imageView.centerXAnchor.constraint(equalTo: cell.contentView.centerXAnchor).isActive = true

                        // Set the top constraint for the image view
                        let imageTopConstraint = imageView.topAnchor.constraint(equalTo: cell.contentView.topAnchor)
                        imageTopConstraint.priority = .defaultHigh
                        imageTopConstraint.isActive = true

                        // Set the bottom constraint for the image view
                        let imageBottomConstraint = imageView.bottomAnchor.constraint(equalTo: cell.contentView.bottomAnchor, constant: -8) // Adjust the constant value as needed
                        imageBottomConstraint.priority = .defaultHigh
                        imageBottomConstraint.isActive = true

                        // Create and configure the label for the caption
                        let captionLabel = UILabel()
                        captionLabel.text = post.object(forKey: "caption") as? String
                        captionLabel.textAlignment = .center
                        captionLabel.numberOfLines = 0
                        captionLabel.translatesAutoresizingMaskIntoConstraints = false
                        cell.contentView.addSubview(captionLabel)

                        // Position the caption label below the image view
                        captionLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 8).isActive = true
                        captionLabel.leadingAnchor.constraint(equalTo: cell.contentView.leadingAnchor, constant: 8).isActive = true
                        captionLabel.trailingAnchor.constraint(equalTo: cell.contentView.trailingAnchor, constant: -8).isActive = true
                        captionLabel.bottomAnchor.constraint(equalTo: cell.contentView.bottomAnchor, constant: -8).isActive = true

                        cell.setNeedsLayout() // Ensure the cell layout is updated
                    }
                }
            }
        }

        return cell
    }

    
    // MARK: - Properties
        
        lazy var containerView: UIView = {
            let view = UIView()
            view.backgroundColor = .mainBlue
            
            view.addSubview(profileImageView)
            profileImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
            profileImageView.anchor(top: view.topAnchor, paddingTop: 140, width: 120, height: 120)
            profileImageView.layer.cornerRadius = 120 / 2
            
            view.addSubview(nameLabel)
            nameLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
            nameLabel.anchor(top: profileImageView.bottomAnchor, paddingTop: 12)
            
            return view
        }()
        
        
        let profileImageView: UIImageView = {
           let iv = UIImageView()
            iv.contentMode = .scaleAspectFill
            iv.clipsToBounds = true
            iv.layer.borderWidth = 3
            iv.layer.borderColor = UIColor.white.cgColor
            return iv
        }()
        
        let nameLabel: UILabel = {
            let label = UILabel()
            label.textAlignment = .center
            label.font = UIFont.boldSystemFont(ofSize: 26)
            label.textColor = .white
            return label
        }()
    
        let tableView: UITableView = {
            let tableView = UITableView()
            tableView.translatesAutoresizingMaskIntoConstraints = false
            tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
            return tableView
        }()
        
        // MARK: - LifeCycle
    
        var posts: [PFObject] = []
        
        
        override func viewDidLoad() {
            super.viewDidLoad()

            view.backgroundColor = .white
            
            view.addSubview(containerView)
            containerView.anchor(top: view.topAnchor, left: view.leftAnchor, right: view.rightAnchor, height: 340)
            
            view.addSubview(tableView)
            tableView.topAnchor.constraint(equalTo: containerView.bottomAnchor, constant: 20).isActive = true
            tableView.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 20).isActive = true
            tableView.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -20).isActive = true
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -20).isActive = true
            
            tableView.delegate = self
            tableView.dataSource = self
            
            fetchUserInfo()
            fetchPosts()
        }
        
        override var preferredStatusBarStyle: UIStatusBarStyle
        {
            return .lightContent
        }
        
        // Mark: - Selectors
        
        // fetch user info from Parse
    func fetchUserInfo() {
        guard let currentUser = PFUser.current() else {
            return
        }
        
        // Fetch user data
        currentUser.fetchInBackground { [weak self] (user, error) in
            guard let self = self else { return }
            
            if let error = error {
                print("Error fetching user data: \(error.localizedDescription)")
                return
            }
            
            // Update UI with user data
            if let username = user?.object(forKey: "username") as? String {
                self.nameLabel.text = username
            } else {
                self.nameLabel.text = ""
            }
            
            // Fetch user's profile image from Parse
            if let imageFile = user?["profileImage"] as? PFFileObject {
                imageFile.getDataInBackground { (data, error) in
                    if let error = error {
                        print("Error fetching profile image: \(error.localizedDescription)")
                        return
                    }
                    
                    if let data = data, let image = UIImage(data: data) {
                        DispatchQueue.main.async {
                            self.profileImageView.image = image
                        }
                    }
                }
            } else if let profilePictureData = user?["profilePicture"] as? String,
                      let imageData = Data(base64Encoded: profilePictureData),
                      let image = UIImage(data: imageData) {
                DispatchQueue.main.async {
                    self.profileImageView.image = image
                }
            }
        }
    }

    
    func fetchPosts() {
            guard let currentUser = PFUser.current() else {
                print("Error: No current user.")
                return
            }

            let query = PFQuery(className: "Posts")
            query.whereKey("author", equalTo: currentUser)
            query.findObjectsInBackground { [weak self] (posts, error) in
                guard let self = self else { return }

                if let error = error {
                    print("Error fetching posts: \(error.localizedDescription)")
                    return
                }

                if let posts = posts {
                    self.posts = posts // Modified line
                    self.tableView.reloadData()
                }
            }
        }

        }

extension UIColor
{
    static func rgb(red: CGFloat, green: CGFloat, blue: CGFloat) -> UIColor
    {
        return UIColor(red: red/255, green: green/255, blue: blue/255, alpha: 1)
    }
    
    static let mainBlue = UIColor.rgb(red: 0, green: 150, blue: 255)
}

extension UIView
{
    func anchor(top: NSLayoutYAxisAnchor? = nil, left: NSLayoutXAxisAnchor? = nil, bottom: NSLayoutYAxisAnchor? = nil, right: NSLayoutXAxisAnchor? = nil, paddingTop: CGFloat? = 0, paddingLeft: CGFloat? = 0, paddingBottom: CGFloat? = 0, paddingRight: CGFloat? = 0, width: CGFloat? = nil, height: CGFloat? = nil)
    {
        translatesAutoresizingMaskIntoConstraints = false
        
        if let top = top
        {
            topAnchor.constraint(equalTo: top, constant: paddingTop!).isActive = true
        }
        
        if let left = left
        {
            leftAnchor.constraint(equalTo: left, constant: paddingLeft!).isActive = true
        }
        
        if let bottom = bottom
        {
            if let paddingBottom = paddingBottom
            {
                bottomAnchor.constraint(equalTo: bottom, constant: -paddingBottom).isActive = true
            }
        }
        
        if let right = right
        {
            if let paddingRight = paddingRight
            {
                rightAnchor.constraint(equalTo: right, constant: -paddingRight).isActive = true
            }
        }
        
        if let width = width
        {
            widthAnchor.constraint(equalToConstant: width).isActive = true
        }
        
        if let height = height
        {
            heightAnchor.constraint(equalToConstant: height).isActive = true
        }
    }
}

extension UIImage {
    func resizedImage(with size: CGSize) -> UIImage? {
        let renderer = UIGraphicsImageRenderer(size: size)
        return renderer.image { _ in
            draw(in: CGRect(origin: .zero, size: size))
        }
    }
}

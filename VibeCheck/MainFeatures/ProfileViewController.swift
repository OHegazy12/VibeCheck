//
//  ProfileViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/27/23.
//

import UIKit
import Parse
import AlamofireImage

class ProfileViewController: UIViewController {

    @IBOutlet weak var profilePictureImageView: UIImageView!
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var birthdateLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load the user's profile data
        loadProfileData()
    }
    
    func loadProfileData() {
        guard let currentUser = PFUser.current() else {
            print("No current user found")
            return
        }
        
        // Load the user's profile picture
        if let profilePicture = currentUser["profilePicture"] as? PFFileObject {
            profilePicture.getDataInBackground { (data, error) in
                if let data = data {
                    self.profilePictureImageView.image = UIImage(data: data)
                } else {
                    print("Error loading profile picture: \(error?.localizedDescription ?? "Unknown error")")
                }
            }
        }
        
        // Load the user's username
        if let username = currentUser.username {
            usernameLabel.text = username
        }
        
        // Load the user's birthdate
        if let dateOfBirth = currentUser["dateOfBirth"] as? Date {
            let dateFormatter = DateFormatter()
            dateFormatter.dateStyle = .medium
            birthdateLabel.text = dateFormatter.string(from: dateOfBirth)
        }
    }

}

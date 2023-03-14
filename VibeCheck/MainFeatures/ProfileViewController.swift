//
//  ProfileViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/27/23.
//

import UIKit
import Parse
import AlamofireImage

class ProfileViewController: UIViewController
{

    @IBOutlet var usernameLabel: UILabel!
    @IBOutlet var profileImageView: UIImageView!
    @IBOutlet var profileBio: UILabel!
    @IBOutlet var editButton: UIButton!
    
    var username: String?
    var profileImage: UIImage?
    var userBio: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        
        usernameLabel.text = username
        profileImageView.image = profileImage
        profileBio.text = userBio
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

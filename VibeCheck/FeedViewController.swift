//
//  FeedViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse
import AlamofireImage
import MessageInputBar

class FeedViewController: /*UITableViewController*/ UIViewController, MessageInputBarDelegate
{
    
    // Allows user to log out of the application.
    @IBAction func onLogOut(_ sender: Any)
    {
        PFUser.logOut()
        
        let main = UIStoryboard(name: "Main", bundle: nil)
        let loginVC = main.instantiateViewController(withIdentifier: "LoginViewController")
        let delegate = self.view.window?.windowScene?.delegate as! SceneDelegate
        delegate.window?.rootViewController = loginVC
    }
}

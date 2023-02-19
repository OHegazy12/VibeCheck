//
//  ViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse

class LoginViewController: UIViewController {
    
    @IBOutlet weak var usernameField: UITextField!


    @IBOutlet weak var passwordField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
    }
    
    
    @IBAction func onSignIn(_ sender: Any)
    {
        let username = usernameField.text!
        let password = passwordField.text!
        
        PFUser.logInWithUsername(inBackground: username, password: password)
        {
            (user, error) in
            if user != nil
            {
                self.performSegue(withIdentifier: "LoginSegue", sender: nil)
            }
            else
            {
                print("Error\(error?.localizedDescription)")
            }
        }
    }

}

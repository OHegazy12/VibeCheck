//
//  LoginViewController.swift
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
        initializeHideKeyboard()
    }
    
    // Logging into existing account implementation
    @IBAction func onSignIn(_ sender: Any)
    {
        // Allows app to read input in text fields as username and passwords
        let username = usernameField.text!
        let password = passwordField.text!
        
        // Allows user to log into their account any time in the future
        PFUser.logInWithUsername(inBackground: username, password: password)
        {
            // Verifies with database server to see if input matches account info in User class.
            (user, error) in
            if user != nil
            {
                self.performSegue(withIdentifier: "LoginSegue", sender: nil)
            }
            else
            {
                print("Error\(String(describing: error?.localizedDescription))")
                let alert = UIAlertController(title: "Error", message: "Account info either does not exist or is incorrect.", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default,handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
        }
    }

    // Following two functions allows user to dismiss keyboard by tapping anywhere on the screen.
    func initializeHideKeyboard()
    {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissMyKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    @objc func dismissMyKeyboard()
    {
        view.endEditing(true)
    }
    
}

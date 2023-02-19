//
//  SignUpViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse

class SignUpViewController: UIViewController
{
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBOutlet weak var confirmPasswordFieldText: UITextField!
    
    @IBOutlet weak var signUpButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
    @IBAction func signUpButtonTapped(_ sender: UIButton)
    {
        guard let username = usernameTextField.text, !username.isEmpty, username.isValidUsername,
              let email = emailTextField.text, /*email.isValidEmail,*/ !email.isEmpty,
              let password = passwordTextField.text, password.isValidPassword, !password.isEmpty,
              let confirmpw = confirmPasswordFieldText.text, !confirmpw.isEmpty,confirmpw == password else
        {
            let alert = UIAlertController(title: "Error", message: "Please fill out all required fields", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default,handler: nil))
            present(alert, animated: true, completion: nil)
            return
        }
        
        let newUser = User(username: username, password: password, email: email)
        
        let storyboard : UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let createProfileViewController = storyboard.instantiateViewController(withIdentifier: "CreateProfileViewController")
        present(createProfileViewController, animated: true)
    }
    
    
}

public extension String
{
    var isValidUsername: Bool
    {
        let usernameSensitive = "^[a-zA-Z0-9._-]{3,16}$"
        return NSPredicate(format: "SELF MATCHES %@", usernameSensitive).evaluate(with: self)
    }
    
    /*var isValidEmail: Bool
    {
        let emailSensitive = "[a-z0-9]+@[a-z.]+\\.[A-Za]{2,}"
        return NSPredicate(format: "SELF MATCHES %@", emailSensitive).evaluate(with: self)
    }*/
    
    var isValidPassword: Bool
    {
        let passwordSensitive = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
        return NSPredicate(format: "SELF MATCHES %@", passwordSensitive).evaluate(with: self)
    }
}
     
class User
{
  var username: String
  var password: String
  var email: String
   
  init(username: String, password: String, email: String)
    {
        self.username = username
        self.password = password
        self.email = email
    }
    
}

class SecondViewController : CreateProfileViewController
{
    override func viewDidLoad() {
        view.backgroundColor = .systemRed
        title = "Create Your Profile"
    }
}

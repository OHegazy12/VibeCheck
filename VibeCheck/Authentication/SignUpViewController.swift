//
//  SignUpViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse

class SignUpViewController: UIViewController, UITextFieldDelegate, UIGestureRecognizerDelegate
{
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBOutlet weak var confirmPasswordFieldText: UITextField!
    
    @IBOutlet weak var signUpButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initializeHideKeyboard()
    }
    
    // Implementation of creating a new account
    @IBAction func signUpButtonTapped(_ sender: UIButton)
    {
        // Ensures all fields are filled with valid inputs.
        guard let username = usernameTextField.text, !username.isEmpty, username.isValidUsername,
              let email = emailTextField.text, email.isValidEmail, !email.isEmpty,
              let password = passwordTextField.text, password.isValidPassword, !password.isEmpty,
              let confirmpw = confirmPasswordFieldText.text, !confirmpw.isEmpty,confirmpw == password else
        {
            let alert = UIAlertController(title: "Error", message: "Please fill out all required fields", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default,handler: nil))
            present(alert, animated: true, completion: nil)
            return
        }
        
        // Sets a variable as a object in User class.
        let user = PFUser()
        user.username = username
        user.email = email
        user.password = password

        // Creates a new user asynchronously
        user.signUpInBackground
        { (success, error) in
            if success
            {
                let storyboard : UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                let createProfileViewController = storyboard.instantiateViewController(withIdentifier: "CreateProfileViewController")
                self.present(createProfileViewController, animated: true) // Pushes navigation controller to top of stack, takes user to next page.
            }
            else
            {
                print("Error: \(String(describing: error?.localizedDescription))")
            }
        }
        
//        // Call your API to sign up the user.
//        APICaller.shared.signUp(email: email, username: username, password: password) { result in
//            switch result {
//            case .success:
//                let storyboard = UIStoryboard(name: "Main", bundle: nil)
//                let createProfileViewController = storyboard.instantiateViewController(withIdentifier: "CreateProfileViewController")
//                self.present(createProfileViewController, animated: true) // Pushes navigation controller to top of stack, takes user to next page.
//            case .failure(let error):
//                print("Error: \(error.localizedDescription)")
//            }
//        }
    }
    
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

public extension String
{
    // Case sensitivity for username
    var isValidUsername: Bool
    {
        let usernameSensitive = "^[a-zA-Z0-9._-]{3,16}$"
        return NSPredicate(format: "SELF MATCHES %@", usernameSensitive).evaluate(with: self)
    }
    
    // Case sensitivity for email address
    var isValidEmail: Bool
    {
        let emailSensitive = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        return NSPredicate(format: "SELF MATCHES %@", emailSensitive).evaluate(with: self)
    }
    
    // Case sensitivity for password
    var isValidPassword: Bool
    {
        let passwordSensitive = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
        return NSPredicate(format: "SELF MATCHES %@", passwordSensitive).evaluate(with: self)
    }
}

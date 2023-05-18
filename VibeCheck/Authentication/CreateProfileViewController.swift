//
//  CreateProfileViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/18/23.
//

import UIKit
import Parse
import AlamofireImage

class CreateProfileViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate
{
    @IBOutlet weak var profilePictureImageView: UIImageView!
    @IBOutlet weak var dateTextField: UITextField!
    
   
    @IBOutlet weak var firstNameTextField: UITextField!
    
    @IBOutlet weak var lastNameTextField: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        initializeHideKeyboard()
        
        // Creates a date picker
        let datePicker = UIDatePicker()
        datePicker.datePickerMode = .date
        datePicker.addTarget(self, action: #selector(datePickerValueChanged(_:)), for: .valueChanged)
        
        // Sets input view of text field to date picker format.
        dateTextField.inputView = datePicker
        
        // Creates a toolbar with a "Done" button to dismiss date picker.
        let toolbar = UIToolbar()
        toolbar.sizeToFit()
        let doneButton = UIBarButtonItem(title: "Done", style: .done, target: self, action: #selector(doneButtonTapped))
        toolbar.setItems([doneButton], animated: false)
        
        // Set the input accessory view of the text field to the toolbar
        dateTextField.inputAccessoryView = toolbar
    }
    
    
    // Creates profile when button is tapped
    @IBAction func createProfileButtonTapped(_ sender: Any)
    {
        saveProfile()
    }
    
    func navigateToFeedViewController()
    {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let feedVC = storyboard.instantiateViewController(withIdentifier: "FeedViewController")
        present(feedVC, animated: true)
    }
    
    @objc func datePickerValueChanged(_ sender: UIDatePicker)
    {
        // Update text fied with selected date in Month/Day/Year format
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MM/dd/yyyy"
        dateTextField.text = dateFormatter.string(from: sender.date)
    }
    
    @objc func doneButtonTapped()
    {
        // Dismisses date picker
        dateTextField.resignFirstResponder()
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
    
    @IBAction func onCameraButton(_ sender: Any)
    {
        // Sets up a picker that lets users select an image or take one.
        let picker = UIImagePickerController()
        picker.delegate = self
        picker.allowsEditing = true
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary)
        {
            picker.sourceType = .photoLibrary
        }
        else
        {
            picker.sourceType = .camera
        }
        
        present(picker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any])
    {
        // Get the selected image from the info dictionary
        if let selectedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage
        {
            // Set the selected image as the profile picture
            profilePictureImageView.image = selectedImage
        }
            
        // Dismiss the UIImagePickerController
        dismiss(animated: true, completion: nil)
    }
        
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController)
    {
        // Dismiss the UIImagePickerController
        dismiss(animated: true, completion: nil)
    }
    
    func saveProfile() {
        // Create a dictionary for the user's profile data
        var profileData = [String: Any]()

        // Set the profile picture image as a base64-encoded string
        if let imageData = profilePictureImageView.image?.pngData()?.base64EncodedString() {
            profileData["profilePicture"] = imageData
        }

        // Set the date of birth as a string
        if let dateString = dateTextField.text {
            profileData["dateOfBirth"] = dateString
        }

        // Set the first and last name
        profileData["firstName"] = firstNameTextField.text ?? ""
        profileData["lastName"] = lastNameTextField.text ?? ""

        // Save the profile data
        APICaller.shared.createProfile(firstname: profileData["firstName"] as! String,
                                        lastname: profileData["lastName"] as! String,
                                        dateofbirth: profileData["dateOfBirth"] as! String) { result in
            switch result {
            case .success:
                print("Profile saved successfully")
                self.navigateToFeedViewController()
            case .failure(let error):
                print("Error saving profile: \(error.localizedDescription)")
            }
        }
        
//        // Create a Parse object for the user's profile
//                let profile = PFObject(className: "Profile")
//
//                // Set the profile picture image as a Parse file
//                if let imageData = profilePictureImageView.image?.pngData() {
//                    let file = PFFileObject(name: "profile_picture.png", data: imageData)
//                    profile["profilePicture"] = file
//                }
//
//                // Set the date of birth as a Date object
//                if let dateString = dateTextField.text, let date = DateFormatter().date(from: dateString) {
//                    profile["dateOfBirth"] = date
//                }
//
//                // Save the profile object
//                profile.saveInBackground { (success, error) in
//                    if success {
//                        print("Profile saved successfully")
//                        self.navigateToFeedViewController()
//                    } else {
//                        print("Error saving profile: \(error?.localizedDescription ?? "Unknown error")")
//                    }
//                }
    }


}

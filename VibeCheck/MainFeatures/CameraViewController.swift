//
//  CameraViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import AlamofireImage
import Parse
import Amplify
import AWSCognitoAuthPlugin
import AWSS3StoragePlugin

class CameraViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate
{
    @IBOutlet weak var imageView: UIImageView!
    
    @IBOutlet weak var captionField: UITextField!
    
    @IBAction func onSubmitPostButton(_ sender: Any) {
        Task { @MainActor in
            // Handles upload screen.
            guard let uploadImage = imageView.image, let postBio = captionField.text, !postBio.isEmpty
            else
            {
                let alert = UIAlertController(title: "Error", message: "Please fill out all required fields.", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                self.present(alert, animated: true, completion: nil)
                return
            }
            
            // Updates Post class whenever a new post is made
            let post = PFObject(className: "Posts")
            
            post["caption"] = postBio
            post["author"] = PFUser.current()!
            
            let imageData = uploadImage.pngData()
            let file = PFFileObject(data: imageData!)
            
            post["image"] = file
            
            // Saves post to the server
            post.saveInBackground
            {
                (success, error) in
                if success
                {
                    self.dismiss(animated: true, completion: nil)
                    print("saved!")
                }
                else
                {
                    print("Error: \(String(describing: error?.localizedDescription))")
                }
            }
            
            //let fileName = UUID().uuidString + ".png"
            
            func uploadData() async throws
            {
                print("Function is being called.")
                let dataString = "Example file contents"
                let data = Data(dataString.utf8)
                let uploadTask = Amplify.Storage.uploadData(
                    key: "ExampleKey",
                    data: data
                )
                Task {
                    for await progress in await uploadTask.progress
                    {
                        print("Progress: \(progress)")
                    }
                        print("Error: Could Not Upload!")
                }
                let value = try await uploadTask.value
                    print("Completed: \(value)")
                    print("uploadData() completed")
            }
            
            try await uploadData()
        }
    }

    
    @IBAction func onCameraButton(_ sender: Any)
    {
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
        let image = info[.editedImage] as! UIImage
        
        let size = CGSize(width: 300, height: 300)
        let scaledImage = image.af.imageScaled(to: size)
        
        imageView.image = scaledImage
        
        dismiss(animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initializeHideKeyboard()

        // Do any additional setup after loading the view.
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

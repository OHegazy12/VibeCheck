//
//  ProfileViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/11/23.
//

import UIKit
import Parse

class ProfileViewController: UIViewController {
    
    // MARK: - Properties
    
    lazy var containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .mainBlue
        
        view.addSubview(profileImageView)
        profileImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        profileImageView.anchor(top: view.topAnchor, paddingTop: 140, width: 120, height: 120)
        profileImageView.layer.cornerRadius = 120 / 2
        
        view.addSubview(messageButton)
        messageButton.anchor(top: view.topAnchor, left: view.leftAnchor, paddingTop: 150, paddingLeft: 32, width: 32, height: 32)
        
        view.addSubview(nameLabel)
        nameLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        nameLabel.anchor(top: profileImageView.bottomAnchor, paddingTop: 12)
        
        return view
    }()
    
    
    let profileImageView: UIImageView = {
       let iv = UIImageView()
        iv.image = UIImage(named: "profileimage100")
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        iv.layer.borderWidth = 3
        iv.layer.borderColor = UIColor.white.cgColor
        return iv
    }()
    
    let messageButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(named: "directmessage64")!.withRenderingMode(.alwaysOriginal), for: .normal)
        button.addTarget(self, action: #selector(handleMessageUser), for: .touchUpInside)
        return button
    }()
    
    let nameLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .center
        label.text = "TestAccount1"
        label.font = UIFont.boldSystemFont(ofSize: 26)
        label.textColor = .white
        return label
    }()
    
    // MARK: - LifeCycle
    
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white
        
        view.addSubview(containerView)
        containerView.anchor(top: view.topAnchor, left: view.leftAnchor, right: view.rightAnchor, height: 340)
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle
    {
        return .lightContent
    }
    
    // Mark: - Selectors
    
    @objc func handleMessageUser()
    {
        print("Message user here...")
        let vc = ChatViewController()
        navigationController?.pushViewController(vc, animated: true)
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

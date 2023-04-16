//  DirectMessagingViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/10/23.
//

import UIKit
import MessageKit
import Parse

class DirectMessagingViewController: UIViewController, UITableViewDelegate, UITableViewDataSource
{   var otherUsers = [PFUser]()
    var currentUser: PFUser!
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return otherUsers.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = otherUsers[indexPath.row].username
        cell.accessoryType = .disclosureIndicator
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        // Show chat messages
        let vc = ChatViewController()
        vc.title = otherUsers[indexPath.row].username
        navigationController?.pushViewController(vc, animated: true)
    }
    
    @IBOutlet var myTable: UITableView!
    
    override func viewDidLoad()
       {
           super.viewDidLoad()
           
           myTable.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
           myTable.delegate = self
           myTable.dataSource = self
           
           // Get current user
           currentUser = PFUser.current()
           
           // Query for other users
           let query = PFUser.query()
           query?.whereKey("objectId", notEqualTo: currentUser.objectId!)
           query?.findObjectsInBackground(block: { (users, error) in
               if let users = users as? [PFUser] {
                   self.otherUsers = users
                   self.myTable.reloadData()
               } else {
                   print("Error querying for users: \(error?.localizedDescription ?? "")")
               }
           })
       }
   }

//  DirectMessagingViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/10/23.
//

import UIKit
import MessageKit
import Parse

class DirectMessagingViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UISearchBarDelegate
{   var otherUsers = [PFUser]()
    var currentUser: PFUser!
    var filteredUsers = [PFUser]()
    var searchBar: UISearchBar!
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filteredUsers.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = filteredUsers[indexPath.row].username
        cell.accessoryType = .disclosureIndicator
        return cell
    }

    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        // Show chat messages
        let vc = ChatViewController()
        vc.title = filteredUsers[indexPath.row].username
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
           
           searchBar = UISearchBar(frame: CGRect(x: 0, y: 0, width: view.frame.width, height: 50))
              searchBar.delegate = self
              myTable.tableHeaderView = searchBar
       }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        // Filter otherUsers array based on searchText
        if searchText.isEmpty {
            // If search bar is empty, show all users
            filteredUsers = otherUsers
        } else {
            // Filter otherUsers by username containing searchText
            filteredUsers = otherUsers.filter { $0.username?.range(of: searchText, options: .caseInsensitive) != nil }
        }
        
        myTable.reloadData()
    }

   }

//
//  CommunityViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 5/2/23.
//

import UIKit
import Parse

class CommunityViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    var sectionNames = [String]()
    
    @IBOutlet weak var sectionTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        sectionTableView.delegate = self
        sectionTableView.dataSource = self
        fetchSections()
    }
    
    func fetchSections() {
        let query = PFQuery(className: "Section")
        query.findObjectsInBackground { [weak self] (sections, error) in
            guard let self = self else { return }
            if let error = error {
                print(error.localizedDescription)
            } else if let sections = sections {
                self.sectionNames = sections.compactMap { $0["name"] as? String }
                self.sectionTableView.reloadData()
            }
        }
    }

    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return sectionNames.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = tableView.dequeueReusableCell(withIdentifier: "CommunityPostCell") as! CommunityPostCell
            cell.sectionName.text = sectionNames[indexPath.row]
            return cell
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
            let sectionName = sectionNames[indexPath.row]
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let communityPostsViewController = storyboard.instantiateViewController(withIdentifier: "CommunityPostsViewController") as! CommunityPostsViewController
            communityPostsViewController.sectionName = sectionName
            navigationController?.pushViewController(communityPostsViewController, animated: true)
        }
        
        @IBAction func addSectionButtonPressed(_ sender: Any) {
            let alert = UIAlertController(title: "New Section", message: "Enter a name for the new section", preferredStyle: .alert)
            alert.addTextField()
            let addAction = UIAlertAction(title: "Add", style: .default) { [weak self] (_) in
                guard let sectionName = alert.textFields?[0].text else { return }
                let section = PFObject(className: "Section")
                section["name"] = sectionName
                section.saveInBackground { (success, error) in
                    if let error = error {
                        print(error.localizedDescription)
                    } else if success {
                        self?.sectionNames.append(sectionName)
                        self?.sectionTableView.reloadData()
                    }
                }
            }
            let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
            alert.addAction(addAction)
            alert.addAction(cancelAction)
            present(alert, animated: true, completion: nil)
        }
}

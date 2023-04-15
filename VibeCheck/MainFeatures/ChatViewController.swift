//
//  ChatViewController.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/11/23.
//

import UIKit
import MessageKit
import InputBarAccessoryView
import Parse

struct Message: MessageType
{
    var sender: SenderType
    var messageId: String
    var sentDate: Date
    var kind: MessageKind
    var conversationId: String
}

class ChatViewController: MessagesViewController, MessagesDataSource, MessagesLayoutDelegate, MessagesDisplayDelegate, InputBarAccessoryViewDelegate
{
    let currentUser = PFUser.current()!
    var otherUser: PFUser!
    var messages = [MessageType]()
    var inputBar = InputBarAccessoryView()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Set up the other user
        let query = PFUser.query()
        query?.whereKey("objectId", notEqualTo: currentUser.objectId!)
        query?.findObjectsInBackground(block: { (objects, error) in
            if let users = objects as? [PFUser], let user = users.first {
                self.otherUser = user
                
                // Retrieve previous messages from Parse
                let conversationId = "\(self.currentUser.objectId!)\(self.otherUser.objectId!)"
                let messageQuery = PFQuery(className: "Message")
                messageQuery.whereKey("conversationId", equalTo: conversationId)
                messageQuery.whereKey("sender", equalTo: self.currentUser)
                messageQuery.whereKey("recipient", equalTo: self.otherUser!)
                let recipientQuery = PFQuery(className: "Message")
                recipientQuery.whereKey("conversationId", equalTo: conversationId)
                recipientQuery.whereKey("sender", equalTo: self.otherUser!)
                recipientQuery.whereKey("recipient", equalTo: self.currentUser)
                let query = PFQuery.orQuery(withSubqueries: [messageQuery, recipientQuery])
                query.findObjectsInBackground { (objects, error) in
                    if let messages = objects {
                        for message in messages {
                            let sender = message["sender"] as! PFUser
                            let text = message["text"] as! String
                            let sentDate = message.createdAt!
                            let messageKind = MessageKind.text(text)
                            let messageSender: Sender
                            do {
                                try sender.fetchIfNeeded()
                                messageSender = Sender(senderId: sender.objectId!, displayName: sender.username ?? "")
                            } catch {
                                messageSender = Sender(senderId: sender.objectId!, displayName: "Unknown")
                                print("Error fetching sender: \(error.localizedDescription)")
                            }
                            let message = Message(sender: messageSender, messageId: message.objectId!, sentDate: sentDate, kind: messageKind, conversationId: conversationId)
                            self.messages.append(message)
                            print("Fetched previous messages!")
                        }

                        self.messagesCollectionView.reloadData()
                        self.messagesCollectionView.scrollToLastItem(animated: false)
                    }
                }
            }
        })

        // Configure the messages collection view and input bar
        messagesCollectionView.messagesDataSource = self
        messagesCollectionView.messagesLayoutDelegate = self
        messagesCollectionView.messagesDisplayDelegate = self
        view.addSubview(inputBar)
        inputBar.delegate = self
        inputBar.inputTextView.placeholder = "Type a message..."
        inputBar.sendButton.setTitle("Send", for: .normal)
        inputBar.sendButton.setTitleColor(view.tintColor, for: .normal)
        inputBar.sendButton.addTarget(self, action: #selector(sendButtonPressed), for: .touchUpInside)
        inputBar.translatesAutoresizingMaskIntoConstraints = false
        inputBar.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        inputBar.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
        inputBar.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true
    }
    
    func currentSender() -> SenderType
    {
        return Sender(senderId: currentUser.objectId!, displayName: currentUser.username ?? "")
    }
    
    func numberOfSections(in messagesCollectionView: MessagesCollectionView) -> Int
    {
        return messages.count
    }

    func messageForItem(at indexPath: IndexPath, in messagesCollectionView: MessagesCollectionView) -> MessageType
    {
        return messages[indexPath.section]
    }
    
    @objc func sendButtonPressed()
    {
        let messageText = inputBar.inputTextView.text.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !messageText.isEmpty else {
                return
            }
            
        let message = Message(sender: currentSender(), messageId: UUID().uuidString, sentDate: Date(), kind: .text(inputBar.inputTextView.text ?? ""), conversationId: "\(currentUser.objectId!)\(otherUser.objectId!)")
            messages.append(message)
            messagesCollectionView.reloadData()
            messagesCollectionView.scrollToLastItem(animated: true)
            inputBar.inputTextView.text = ""
            print("Message sent!")
            
            // Save the message to Parse
            let parseMessage = PFObject(className: "Message")
            parseMessage["sender"] = currentUser
            parseMessage["recipient"] = otherUser
            parseMessage["text"] = messageText
            parseMessage.saveInBackground { (success, error) in
                if success {
                    print("Message saved!")
                } else {
                    print("Error saving message: \(error?.localizedDescription ?? "unknown error")")
                }
            }
    }
    
    func inputBar(_ inputBar: InputBarAccessoryView, textViewTextDidChangeTo text: String)
    {
        if text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        {
            inputBar.sendButton.isEnabled = false
        } else
        {
            inputBar.sendButton.isEnabled = true
        }
    }
    
    func inputBar(_ inputBar: InputBarAccessoryView, didPressSendButtonWith text: String)
    {
        sendButtonPressed()
    }
}

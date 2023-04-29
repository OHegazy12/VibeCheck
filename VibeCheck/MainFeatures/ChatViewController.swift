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
}

class ChatViewController: MessagesViewController, MessagesDataSource, MessagesLayoutDelegate, MessagesDisplayDelegate, InputBarAccessoryViewDelegate
{
    let currentUser = PFUser.current()!
    var otherUser: PFUser!
    var messages = [MessageType]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set up the other user
        let query = PFUser.query()
        query?.whereKey("objectId", notEqualTo: currentUser.objectId!)
        query?.findObjectsInBackground(block: { (objects, error) in
            if let users = objects as? [PFUser], let user = users.first {
                self.otherUser = user
                
                // Retrieve previous messages from Parse
                let messageQuery = PFQuery(className: "Message")
                messageQuery.whereKey("sender", equalTo: self.currentUser)
                messageQuery.whereKey("recipient", equalTo: self.otherUser!)
                let recipientQuery = PFQuery(className: "Message")
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
                            let message = Message(sender: messageSender, messageId: message.objectId!, sentDate: sentDate, kind: messageKind)
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
        messageInputBar.delegate = self
        messageInputBar.inputTextView.placeholder = "Type a message..."
        messageInputBar.sendButton.setTitle("Send", for: .normal)
        messageInputBar.sendButton.setTitleColor(view.tintColor, for: .normal)
        messageInputBar.sendButton.addTarget(self, action: #selector(sendButtonPressed), for: .touchUpInside)
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
    
    @objc func sendButtonPressed() {
        let messageText = messageInputBar.inputTextView.text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !messageText.isEmpty else {
            return
        }
        
        let messageId = "\(currentUser.objectId!)-\(otherUser.objectId!)-\(Int(Date().timeIntervalSince1970))"
        let message = Message(sender: currentSender(), messageId: messageId, sentDate: Date(), kind: .text(messageText))
        messages.append(message)
        messageInputBar.inputTextView.text = ""
        messagesCollectionView.reloadData()
        messagesCollectionView.scrollToLastItem(animated: true)
        print("Message sent!")
        
        // Save the message to Parse
        let parseMessage = PFObject(className: "Message")
        parseMessage["sender"] = currentUser
        parseMessage["recipient"] = otherUser
        parseMessage["text"] = messageText
        parseMessage["messageId"] = messageId
        parseMessage.saveInBackground { (success, error) in
            if success {
                print("Message saved!")
            } else if let error = error {
                print("Error saving message: \(error.localizedDescription)")
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

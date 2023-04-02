//
//  Backend.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 3/30/23.
//

import UIKit
import Amplify
import AWSCognitoAuthPlugin
import AWSS3StoragePlugin
import AWSS3
import AWSAPIPlugin
import Logging
import ClientRuntime
import Foundation

class Backend
{
    private var logger = Logger(label: "\(Backend.self).Backend")
    
    static let shared = Backend()
        static func initialize() -> Backend
    {
        return .shared
    }
    
    private init()
    {
        do
        {
            try Amplify.add(plugin: AWSCognitoAuthPlugin())
            try Amplify.add(plugin: AWSS3StoragePlugin())
            try Amplify.configure()
            print("Amplify configured with Auth and Storage plugins")
            print("Amplify configured.")
        } catch
        {
            print("Failed to initialize Amplify with \(error)")
        }   
    }
    
    func uploadData() async throws {
        let dataString = "My Data"
        let fileNameKey = "myFile.txt"
        guard let filename = FileManager.default.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first?.appendingPathComponent(fileNameKey)
        else { return }

        try dataString.write(
            to: filename,
            atomically: true,
            encoding: .utf8
        )

        let uploadTask = Amplify.Storage.uploadFile(
            key: fileNameKey,
            local: filename
        )

        Task {
            for await progress in await uploadTask.progress {
                print("Progress: \(progress)")
            }
        }
        let data = try await uploadTask.value
        print("Completed: \(data)")
    }
}


extension Backend {
    
    func storeImage(name: String, image: Data) async {
        
        do {
            let options = StorageUploadDataRequest.Options(accessLevel: .private)
            let task = Amplify.Storage.uploadData(key: name, data: image, options: options)
            let result = try await task.value
            logger.debug("Image upload completed: \(result)")
            
        } catch let error as StorageError {
            logger.error("Can not upload image \(name): \(error.errorDescription). \(error.recoverySuggestion)")
        } catch {
            logger.error("Unknown error when uploading image \(name): \(error)")
        }
    }
    
    func imageURL(name: String) async -> URL? {
        
        var result: URL? = nil
        do {
            let options = StorageGetURLRequest.Options(accessLevel: .private)
            result = try await Amplify.Storage.getURL(key: name, options: options)
            
        } catch let error as StorageError {
            logger.error("Can not retrieve URL for image \(name): \(error.errorDescription). \(error.recoverySuggestion)")
        } catch {
            logger.error("Unknown error when retrieving URL for image \(name): \(error)")
        }
        return result
    }
    
    func deleteImage(name: String) async {
        
        do {
            let options = StorageRemoveRequest.Options(accessLevel: .private)
            let result = try await Amplify.Storage.remove(key: name, options: options)
            logger.debug("Image \(name) deleted (result: \(result)")
        } catch let error as StorageError {
            logger.error("Can not delete image \(name): \(error.errorDescription). \(error.recoverySuggestion)")
        } catch {
            logger.error("Unknown error when deleting image \(name): \(error)")
        }
    }
}

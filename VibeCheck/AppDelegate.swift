//
//  AppDelegate.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 2/16/23.
//

import UIKit
import Parse

@main
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        Thread.sleep(forTimeInterval: 1.0) // Adds a delay to launch screen
        
        // Connection to backend server.
         let parseConfig = ParseClientConfiguration
        {
                $0.applicationId = "GBObFJ706svjX8KgrovYzIzeKxvPODfEiM1CfYzr" // <- UPDATE
                $0.clientKey = "tUA9BbD0LubPQ7sP2qVVa4ENeWjlKpseWiYg6JCD" // <- UPDATE
                $0.server = "https://parseapi.back4app.com"
        }
             Parse.initialize(with: parseConfig)
        
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

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
    
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool
    {
        // Override point for customization after application launch.
        // Thread.sleep(forTimeInterval: 1.0) // Adds a delay to launch screen
        
        let parseConfig = ParseClientConfiguration
        {
            $0.applicationId = "8352d078c128ca7422ba60ef59e9a37be740ddc3620fa732d514721c95adc802"
            $0.clientKey = nil
            $0.server = "https://vibecheck-capstone.herokuapp.com/parse"
        }
    
        Parse.initialize(with: parseConfig)
        
       //Hash password heroku: $2a$12$iEqdDQNubEmBaG0warXmyedHUCfIRELae.yD8LDWyEe3qYoOxPPTe (Kaoscat1738)
        
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

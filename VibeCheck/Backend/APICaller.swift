//
//  APICaller.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/29/23.
//

import Alamofire

class APICaller {
    static let shared = APICaller()
    
    private let baseURL = "http://localhost:3001"
    
    func login(email: String, password: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/api/login"
        let parameters = ["email": email, "password": password]
        
        AF.request(baseURL + endpoint, method: .post, parameters: parameters)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    print("Login is connected!")
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
    
    func signUp(email: String, username: String, password: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/api/signUp"
        let parameters = ["email": email, "username": username, "password": password]
        
        AF.request(baseURL + endpoint, method: .post, parameters: parameters)
                .validate(statusCode: 200..<300)
                .responseJSON { response in
                    switch response.result {
                    case .success:
                        print("User signed up successfully!")
                        // Call createProfile method to save user info to the API's database
                        self.createProfile(firstname: "", lastname: "", dateofbirth: "") { result in
                            switch result {
                            case .success:
                                completion(.success(true))
                            case .failure(let error):
                                completion(.failure(error))
                            }
                        }
                    case .failure(let error):
                        completion(.failure(error))
                    }
                }
    }
    
    func createProfile(firstname: String, lastname: String, dateofbirth: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/api/ProfileCreation"
        let paremeters = ["firstname": firstname, "lastname": lastname, "dateofbirth": dateofbirth]
        
        AF.request(baseURL + endpoint, method: .post, parameters: paremeters)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    print("Profile Creation is connected!")
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
    
    func createPost(title: String, description: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/post"
        let parameters = ["title": title, "description": description]
        
        AF.request(baseURL + endpoint, method: .post, parameters: parameters)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
    
    func likePost(postId: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/post/like/\(postId)"
        
        AF.request(baseURL + endpoint, method: .post)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
    
    func dislikePost(postId: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/post/dislike/\(postId)"
        
        AF.request(baseURL + endpoint, method: .post)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
    
    func leaveComment(postId: String, comment: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        let endpoint = "/post/comment/\(postId)"
        let parameters = ["comment": comment]
        
        AF.request(baseURL + endpoint, method: .post, parameters: parameters)
            .validate(statusCode: 200..<300)
            .responseJSON { response in
                switch response.result {
                case .success:
                    completion(.success(true))
                case .failure(let error):
                    completion(.failure(error))
                }
            }
    }
}

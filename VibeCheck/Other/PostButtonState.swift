//
//  PostButtonState.swift
//  VibeCheck
//
//  Created by Omar Hegazy on 4/7/23.
//

import UIKit

class PostButtonState
{
    static let shared = PostButtonState()
    
    var likedPosts: Set<String> = []
    var dislikedPosts: Set<String> = []
    
    private init() {}
    
    func isPostLiked(_ postId: String) -> Bool
    {
        return likedPosts.contains(postId)
    }
    
    func isPostDisliked(_ postId: String) -> Bool
    {
        return dislikedPosts.contains(postId)
    }
    
    func toggleLikeButton(forPostId postId: String)
    {
        if likedPosts.contains(postId)
        {
            likedPosts.remove(postId)
        } else
        {
            likedPosts.insert(postId)
            dislikedPosts.remove(postId)
        }
    }
    
    func toggleDislikeButton(forPostId postId: String)
    {
        if dislikedPosts.contains(postId)
        {
            dislikedPosts.remove(postId)
        } else
        {
            dislikedPosts.insert(postId)
            likedPosts.remove(postId)
        }
    }
}

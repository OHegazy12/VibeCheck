import React from 'react'
import { Avatar, Badge, IconButton, Typography } from '@mui/material'
import { BookmarkBorder, Comment,  Share, ThumbUp } from '@mui/icons-material'
import "./style.css";

function Post({userName, location, caption, postImage, avatar}) {
  return (
    <div className="PostBox" >
            <div className="PostHeader">

            <Avatar alt="Robert" src={avatar} sx={{ width: 65, height: 65 }} />
              <div className="PostProfileDetail">
              <Typography variant='subtitle1'>{userName}</Typography>
            <Typography variant='subtitle2' fontSize={12} color="#cccccc" fontWeight={300} >{location}</Typography>
              </div>
              <IconButton color="dark" >
                <Share/>
              </IconButton>
            </div>
            <div className='PostBody'>
            {caption && <Typography variant='caption'>{caption}</Typography>}
           {postImage && <img src={postImage} alt='Post Image' className='PostImage'/> }         
            </div>
            <div className='PostFooter' >
            <IconButton color="dark" >
              <Badge badgeContent={200} >
              <ThumbUp/>

              </Badge>
                
              </IconButton>
              <IconButton color="dark" >
              <Badge badgeContent={50} >
              <Comment/>            

              </Badge>
                
              </IconButton>
              <IconButton color="dark" >
                <BookmarkBorder/>
              </IconButton>
            </div>
          </div>
  )
}

export default Post
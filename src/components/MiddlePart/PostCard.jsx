import {Avatar, Card, CardHeader,IconButton ,CardMedia,CardContent,Typography,CardActions, Divider} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from "@mui/material/colors";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction, likePostAction } from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({item}) => {

  const [showComments,setShowComments]=useState(false);
  const handleShowComment=()=>setShowComments(!showComments);
  const dispatch=useDispatch();

  const {post,auth}=useSelector(store=>store);

  const handleCreateComment=(content)=>{
    const reqData={
       postId:item.id,
       data:{ 
        content
       }
    }
    dispatch(createCommentAction(reqData));
  }

  const handleLikePost=()=>{
    dispatch(likePostAction(item.id));
  }

  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar src="https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=600" sx={{ bgcolor: red }} aria-label="recipe">
            r
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName+" "+item.user.lastName}
        subheader={"@"+item.user.firstName.toLowerCase()+"_"+item.user.lastName.toLowerCase()}
      />
       <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between" disableSpacing>
        <div className="">
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
          </IconButton>
          <IconButton>
            <ShareIcon/>
          </IconButton>
          <IconButton onClick={handleShowComment}>
             <CommentIcon/>
          </IconButton>
        </div>
        <div>
          {true?<BookmarkIcon/>:<BookmarkBorderIcon/>}
        </div>
      </CardActions>

      {showComments && <section>
        <div className="flex items-center space-x-5 mx-3 my-5">
          <Avatar sx={{}} />
          <input onKeyPress={(e)=>{
                 if(e.key==="Enter"){
                  console.log("key pressed ",e.target.value);
                  handleCreateComment(e.target.value);
                 }
          }} type="text" placeholder="Comment .." className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2 " />
        </div>
        <Divider/>
        {item.comments.map((comment)=> <div className="mx-3 space-y-2 my-5 text-xs">
        
              <div className="flex items-center space-x-5">
                <Avatar sx={{height:"2rem",width:"2rem",fontSize:"8rem"}}>{comment.user.firstName[0]}</Avatar>
                <p>{comment.content}</p>

              </div>
        
        </div>)}
      </section>}

    </Card>
  );
};

export default PostCard;

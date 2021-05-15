import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';
import { loadUser } from "../../actions/auth";
import Axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    //allows to reauthenticate at refresh
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();

    async function fetchPost (){
      try {
        const res = await Axios.get(`http://localhost:3000/api/posts/${match.params.id}`);
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
    console.log(match.params.id)
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
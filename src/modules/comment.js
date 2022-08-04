
const postLink = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/LcQm2NEKuj4kzYqbfKgh/comments";

const postComment = async(id,name,comment) => {
  const newId = "item"+id;
  const response = await fetch(postLink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      item_id: newId,
      username: name,
      comment: comment,
    }),
  });
  const listComment = await response.json();
  return   listComment;
  ;
};

const getComment = async(id) => {
  const getLink = postLink+'?item_id=item'+id;
  const response = await fetch (getLink);
  const data = await response.json();
  return data;
}

export {postComment, getComment};
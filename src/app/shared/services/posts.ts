export interface Post {
   postId: string;
   title: string;
   content: string;
   tags: string[];
   displayName: string;
   createdDate: Date;
   uid: string;
}

export interface PostId extends Post { 
   id: string; 
 }

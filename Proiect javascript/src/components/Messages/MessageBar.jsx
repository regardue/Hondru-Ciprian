import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { TextField, Button, List, ListItem, Typography, Divider } from "@mui/material";

const MessageBar = ({ flatId, receiverUid, currentUserUid }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (flatId && currentUser) {
      fetchMessages();
    }
  }, [flatId, currentUser]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message content cannot be empty");
      return;
    }

    if (!currentUser) {
      console.error("No current user");
      return;
    }

    const messageData = {
      flatId,
      fullName: currentUser.displayName || "Anonymous",
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      receiverUid,
      timestamp: new Date(),
      content: message,
      parentMessageId: null,
    };

    try {
      await addDoc(collection(db, "userMessages"), messageData);
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleReplyMessage = async () => {
    if (!replyContent.trim()) {
      alert("Reply content cannot be empty");
      return;
    }

    if (!currentUser) {
      console.error("No current user");
      return;
    }

    if (!selectedMessage || !selectedMessage.senderUid) {
      console.error("No selected message or senderUid is missing");
      return;
    }

    const replyData = {
      flatId,
      fullName: currentUser.displayName || "Anonymous",
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      receiverUid: selectedMessage.senderUid,
      timestamp: new Date(),
      content: replyContent,
      parentMessageId: selectedMessage.id,
    };

    try {
      await addDoc(collection(db, "userMessages"), replyData);
      setReplyContent("");
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      console.error("Error sending reply: ", error);
    }
  };

  const fetchMessages = async () => {
    if (!flatId || !currentUser) {
      console.error("No flatId or current user provided");
      return;
    }

    try {
      const q = query(
        collection(db, "userMessages"),
        where("flatId", "==", flatId),
        orderBy("timestamp", "asc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched messages: ", fetchedMessages); // Debug log
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  return (
    <div>
      {receiverUid !== currentUserUid && (
        <>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            placeholder="Type a message"
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary">
            Send Message
          </Button>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      {selectedMessage && (
        <div>
          <Typography variant="h6">Reply to:</Typography>
          <Typography>
            <strong>{selectedMessage.fullName || "Anonymous"} ({selectedMessage.senderEmail}):</strong> {selectedMessage.content}
          </Typography>
          <TextField
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            fullWidth
            placeholder="Type a reply"
            multiline
            rows={4}
          />
          <Button onClick={handleReplyMessage} variant="contained" color="secondary">
            Reply
          </Button>
        </div>
      )}
      <List>
        {messages.map((msg) => (
          <div key={msg.id}>
            <ListItem>
              <strong>{msg.fullName || "Anonymous"} ({msg.senderEmail}):</strong> {msg.content}
              {receiverUid === currentUserUid && (
                <Button
                  onClick={() => {
                    console.log("Selected message: ", msg); // Debug log
                    setSelectedMessage(msg);
                    setReplyContent(""); // Clear previous reply content
                  }}
                  variant="outlined"
                  sx={{ ml: 2 }}
                >
                  Reply
                </Button>
              )}
            </ListItem>
            {messages.filter(reply => reply.parentMessageId === msg.id).map(reply => (
              <ListItem key={reply.id} sx={{ pl: 4 }}>
                <Typography variant="body2">
                  <strong>{reply.fullName || "Anonymous"} ({reply.senderEmail}):</strong> {reply.content}
                </Typography>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default MessageBar;

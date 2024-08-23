import React, { useState, useEffect } from "react"; // Import React and hooks
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore"; // Import Firestore functions
import { db, auth } from "../../services/firebase"; // Import Firestore database and authentication
import { TextField, Button, List, ListItem, Typography, Divider } from "@mui/material"; // Import Material-UI components

const MessageBar = ({ flatId, receiverUid, currentUserUid }) => {
  const [message, setMessage] = useState(""); // State to hold the current message content
  const [messages, setMessages] = useState([]); // State to hold the list of messages
  const [replyContent, setReplyContent] = useState(""); // State to hold the content of the reply
  const [selectedMessage, setSelectedMessage] = useState(null); // State to hold the message being replied to
  const currentUser = auth.currentUser; // Get the currently authenticated user

  // Fetch messages when the component mounts or when flatId or currentUser changes
  useEffect(() => {
    if (flatId && currentUser) {
      fetchMessages();
    }
  }, [flatId, currentUser]);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message content cannot be empty"); // Alert if message is empty
      return;
    }

    if (!currentUser) {
      console.error("No current user"); // Log error if no user is logged in
      return;
    }

    const messageData = {
      flatId,
      fullName: currentUser.displayName || "Anonymous", // Use user's display name or "Anonymous"
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      receiverUid,
      timestamp: new Date(), // Current date and time
      content: message,
      parentMessageId: null, // No parent message for new messages
    };

    try {
      await addDoc(collection(db, "userMessages"), messageData); // Add the new message to Firestore
      setMessage(""); // Clear message input field
      fetchMessages(); // Fetch updated list of messages
    } catch (error) {
      console.error("Error sending message: ", error); // Log any errors
    }
  };

  // Function to handle replying to a message
  const handleReplyMessage = async () => {
    if (!replyContent.trim()) {
      alert("Reply content cannot be empty"); // Alert if reply is empty
      return;
    }

    if (!currentUser) {
      console.error("No current user"); // Log error if no user is logged in
      return;
    }

    if (!selectedMessage || !selectedMessage.senderUid) {
      console.error("No selected message or senderUid is missing"); // Log error if no message is selected
      return;
    }

    const replyData = {
      flatId,
      fullName: currentUser.displayName || "Anonymous", // Use user's display name or "Anonymous"
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      receiverUid: selectedMessage.senderUid, // Reply is sent to the original sender
      timestamp: new Date(), // Current date and time
      content: replyContent,
      parentMessageId: selectedMessage.id, // Set parentMessageId to link the reply
    };

    try {
      await addDoc(collection(db, "userMessages"), replyData); // Add the reply to Firestore
      setReplyContent(""); // Clear reply input field
      setSelectedMessage(null); // Deselect the message being replied to
      fetchMessages(); // Fetch updated list of messages
    } catch (error) {
      console.error("Error sending reply: ", error); // Log any errors
    }
  };

  // Function to fetch messages from Firestore
  const fetchMessages = async () => {
    if (!flatId || !currentUser) {
      console.error("No flatId or current user provided"); // Log error if flatId or user is missing
      return;
    }

    try {
      // Query to get messages for the specific flat, ordered by timestamp
      const q = query(
        collection(db, "userMessages"),
        where("flatId", "==", flatId),
        orderBy("timestamp", "asc")
      );
      const querySnapshot = await getDocs(q); // Execute the query
      const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the query results to message objects
      console.log("Fetched messages: ", fetchedMessages); // Debug log
      setMessages(fetchedMessages); // Update state with fetched messages
    } catch (error) {
      console.error("Error fetching messages: ", error); // Log any errors
    }
  };

  return (
    <div>
      {/* Conditionally render message input and send button if the receiver is not the current user */}
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
          <Divider sx={{ my: 2 }} /> {/* Divider for visual separation */}
        </>
      )}
      {/* Conditionally render reply input and reply button if a message is selected */}
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
      {/* Render list of messages */}
      <List>
        {messages.map((msg) => (
          <div key={msg.id}>
            <ListItem>
              <strong>{msg.fullName || "Anonymous"} ({msg.senderEmail}):</strong> {msg.content}
              {receiverUid === currentUserUid && (
                <Button
                  onClick={() => {
                    console.log("Selected message: ", msg); // Debug log
                    setSelectedMessage(msg); // Set the message to be replied to
                    setReplyContent(""); // Clear previous reply content
                  }}
                  variant="outlined"
                  sx={{ ml: 2 }}
                >
                  Reply
                </Button>
              )}
            </ListItem>
            {/* Render replies to the current message */}
            {messages.filter(reply => reply.parentMessageId === msg.id).map(reply => (
              <ListItem key={reply.id} sx={{ pl: 4 }}>
                <Typography variant="body2">
                  <strong>{reply.fullName || "Anonymous"} ({reply.senderEmail}):</strong> {reply.content}
                </Typography>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} /> {/* Divider for visual separation */}
          </div>
        ))}
      </List>
    </div>
  );
};

export default MessageBar;

import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { configureOpenAI } from "../config/aiConfig";


export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    try {

        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            res.status(401).json({message:"User not registered or token malfunctioned"})
        }

        //grab chats of user
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionMessageParam[];
        chats.push({ content: message, role: "user" }); 
        user.chats.push({ content: message, role: "user" });

        // send all chats with new one to openAI API
        const config = configureOpenAI();
        const openai = new OpenAI(config);
        
        // get latest response
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        res.status(200).json({ chats: user.chats });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }

};

export const sendChatsToUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
        }
        res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message });
    }
};

export const deleteChats = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    // user.chats.splice(0, user.chats.length);
    await user.save();
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

import dbConnect from '../../../backend/dbconnect';
import PurchaseEmail from '../../../backend/models/PurchaseEmail';
import nodemailer from 'nodemailer';
import mongoose from "mongoose";

/*
The api takes data from the information step of the multistep popup, saves it to the
mongoDB database and sends two automated emails.
One email is sent to the company email with the purchase emails, and one is sent to the customer
that confirms the purchase.

To implement the automated mailing, I have used nodemailer.
 */

export default async function handler(req, res) {
    await dbConnect();


    //POST request to save purchase details and sends emails
    if (req.method === 'POST') {
        try {
            const {firstName,lastName,email, phone, course} = req.body;

            //saves the purchase details to the database
            const Purchase = new PurchaseEmail({firstName,lastName, email, phone, course});
            await Purchase.save();

            //sends emails using nodemailer
            await sendEmails(firstName,lastName, email, phone, course);

            return res.status(201).json({message: "Purchase recorded and email sent"});

        } catch (error) {
            console.error("Error saving purchase: ", error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
    return res.status(405).json({error: "Method not allowed"});
}

//function to send automated emails using nodemailer
async function sendEmails(firstName,lastName,email,phone,course){


    const transporter = await nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            //the env file is to securely store the company email and password
            // I created the file at the root folder and put it in the gitignore
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }
    });

    //function for the automated email sent to the customer.
    //contains the customer details, and course details, confirming their purchase.
    const customerMailOptions = {
        from:process.env.EMAIL_USER,
        to: email,
        subject: "Purchase confirmation",
        text:  `Hello ${firstName} ${lastName},\n\nThank you for purchasing the ${course}. We will contact you soon.\n\nBest Regards,\nCanadian Way Driving`,
    }

    //function for the automated email sent to the company
    //notifies the company of a new purchase along with all the details.
    const companyMailOptions = {
        from: process.env.EMAIL_USER,
        to: "canadawaydriver@gmail.com",
        subject: "New course purchase",

        text: `New purchase details:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}`,
    };

    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(companyMailOptions);

}
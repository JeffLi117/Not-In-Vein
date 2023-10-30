import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/config/ddbDocClient";
import { UserAuth } from "../context/AuthContext";

const AddData = ({passIntoFunct, upcomingDate, latestDate}) => {
  
  const { firebaseInfo } = UserAuth();
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log("passIntoFunct is ", passIntoFunct);
    console.log("firebaseInfo stuffs ", firebaseInfo);
    console.log("Passed through forms for upcomingDate & latestDonation: ", upcomingDate, " ", latestDate);
    
    // Get data from the form.
    const params = {
      TableName: "Users",
      Item: {
        id: firebaseInfo.uid,
        name: firebaseInfo.name,
        email: firebaseInfo.email,
        upcomingDonation: upcomingDate,
        latestDonation: latestDate,
        allDonations: firebaseInfo.allDonations
      },
    };

    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log("Success - item added", data);
      passIntoFunct();
    } catch (err) {
      console.log("Error", err.stack);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out">Confirm</button>
    </form>
  );
};

export default AddData;

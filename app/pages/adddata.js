import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/config/ddbDocClient";
import { UserAuth } from "../context/AuthContext";
import TokenApi from "../api/TokenApi";

const AddData = ({passIntoFunct, upcomingDate, latestDate}) => {
  
  const { user } = UserAuth();
  const handleSubmit = async (event) => {

    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log(upcomingDate);
    console.log("upcomingDate type is ", typeof upcomingDate);
    // console.log("passIntoFunct is ", passIntoFunct);
    // console.log("firebaseInfo stuffs ", firebaseInfo);
    // console.log("Passed through forms for upcomingDate & latestDonation: ", upcomingDate, " ", latestDate);
    
    // // Get data from the form.
    // const params = {
    //   TableName: "Users",
    //   Item: {
    //     id: firebaseInfo.uid,
    //     name: firebaseInfo.name,
    //     email: firebaseInfo.email,
    //     upcomingDonation: upcomingDate,
    //     latestDonation: latestDate,
    //     allDonations: firebaseInfo.allDonations
    //   },
    // };

    const params = {
      uid: user.uid,
      upcomingdate: upcomingDate,
      latestdonation: latestDate,
    }

    try {
      const data = await TokenApi.addUpcomingDate(params);
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

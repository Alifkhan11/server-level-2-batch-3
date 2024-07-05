import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

const loginUser=catchAsync(async(req,res)=>{
    const resualt=await AuthService.logonUser(req.body)
    const {refreshToken,accessToken,needsPasswordChange}=resualt

    res.cookie('refresshTokon',refreshToken,{
        secure:config.NODE_NEW==='production',
        httpOnly:true
    })

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is Logged in sussefully',
        data:{
            accessToken,
            needsPasswordChange
        }
    })
})
const changePassword=catchAsync(async(req,res)=>{
    const { ...passwordData } = req.body;

    const resualt = await AuthService.changePasswordfromDB(req.user, passwordData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'password change is sussefully',
        data:resualt
    })
})


const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });


export const AuthController={
    loginUser,
    changePassword,
    refreshToken
}
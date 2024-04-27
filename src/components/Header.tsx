"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";

import { FiLogOut } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Products, StateProps } from "../../type";
import FormattedPrice from "./FormattedPrice";
import { addUser, deleteUser } from "@/redux/shoppingSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { productData } = useSelector((state: StateProps) => state.shopping);
  const [totalAmt, setTotalAmt] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);


  // useEffect(() => {
  //   let qty = 0;
  //   productData.forEach((item: Products) => {
  //     console.log(item?.quantity);

  //   })

  // }, [productData])

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  useEffect(() => {
    let amt = 0;
    let qty = 0;
    productData.map((item: Products) => {
      amt += item.price * item.quantity;
      qty += item.quantity;
      return;
    });
    setTotalAmt(amt);
    setTotalQuantity(qty);
        // console.log("Product Names and Quantities:");
        // productData.forEach((item: Products) => {
        //   console.log(`${item?.title} ---- Quantity: ${item?.quantity}`);
        // });
  }, [productData]);

  return (
    <div className="bg-bodyColor h-20 top-0 sticky z-50">
      <Container className="h-full flex items-center md:gap-x-5 justify-between md:justify-start">
        <Logo />
        {/* TODO: Search Field */}
        <div className="w-full hidden md:flex items-center gap-x-1 border-0 border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group">
          </div>
        
        {/* Login / Register */}
        {!session && (
          <div
            onClick={() => signIn()}
            className="headerDiv cursor-pointer"
          >
            <AiOutlineUser className="text-2xl" />
            <p className="text-sm font-semibold">Login/Register</p>
          </div>
        )}
        {/* Cart Button */}
        <Link href={"/cart"}>
          <div className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5 border-[1px] border-black hover:border-orange-600 duration-200 relative">
            <IoMdCart className="text-xl" />
            <p className="text-sm font-semibold">
              <FormattedPrice amount={totalAmt ? totalAmt : 0} />
            </p>
            <span className="bg-white text-orange-600 rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black">
              {/* {productData ? productData?.length : 0} */}
              {totalQuantity}
              {/* {console.log(productData)} */}
              
            </span>
          </div>
        </Link>
        {/*  user Image */}
        {session && (
          <Image
            src={session?.user?.image as string}
            alt="user image"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        )}
        {/* Logout button */}
        {session && (
          <div
            onClick={() => signOut()}
            className="headerDiv px-2 gap-x-1 cursor-pointer"
          >
            <FiLogOut className="text-2xl" />
            <p className="text-sm font-semibold">Logout</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;


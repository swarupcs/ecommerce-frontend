"use client"

import React, { useEffect, useState } from 'react';
import Container from "@/components/Container";
import { getSingleProduct } from "@/helpers";
import { Products } from "../../../type";
import ProductsData from "@/components/ProductsData";
import SingleProduct from "@/components/SingleProduct";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const ProductPage = ({ searchParams }: Props) => {
    const _idString = searchParams?._id;
    const _id = Number(_idString);
    const [product, setProduct] = useState<Products | null>(null); // State to store product details

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getSingleProduct(_id);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (_id) {
            fetchProduct();
        }
    }, [_id]);

    // console.log("Product details:", product);

    return (
        <div>
            <Container>
                {console.log(product)}
                {product && <SingleProduct product={product} />}
                {/* <div>
                    <p className="text-xl py-1 font-semibold">Tranding Products</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {data?.map((item: Products) => (
                            <ProductsData key={item._id} item={item} />
                        ))}
                    </div>
                </div> */}
            </Container>
        </div>
    );
};

export default ProductPage;

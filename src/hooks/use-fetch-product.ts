"use client"
import { useEffect } from 'react';
import axios from 'axios';
import { useProductStore } from '../stores/product';

export const useFetchProducts = () => {
  const { setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setLoading, setError]);
};

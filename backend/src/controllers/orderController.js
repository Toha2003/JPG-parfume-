import { products } from "../data/products.js";

let orders = [];
let nextId = 1;

export const createOrder = (req, res) => {
  const { customerName, customerPhone,locationUser, items } = req.body;

  if (!customerName || !customerPhone ||!locationUser|| !items || !items.length) {
    return res.status(400).json({
      success: false,
      error: { message: "Name, phone, and at least one item are required" },
    });
  }

  // Stock validation
  const stockErrors = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      stockErrors.push(`Product with id ${item.id} not found`);
      continue;
    }
    if (product.stock < item.quantity) {
      stockErrors.push(
        `"${product.name}" omborda yetarli emas. Mavjud: ${product.stock}, siz so'ragan: ${item.quantity}`
      );
    }
  }

  if (stockErrors.length > 0) {
    return res.status(400).json({
      success: false,
      error: { message: stockErrors.join("; ") },
    });
  }

  // Decrement stock
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.stock -= item.quantity;
    }
  }

  const subtotal = items.reduce((sum, item) => {
    const price = item.discountedPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const discount = items.reduce((sum, item) => {
    if (item.discount && item.discount > 0) {
      return sum + (item.price - item.discountedPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const order = {
    id: nextId++,
    customerName,
    customerPhone,
    locationUser,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      discountedPrice: item.discountedPrice,
      quantity: item.quantity,
      image: item.image,
    })),
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    total: subtotal,
    status: "topshirilmagan",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(order);

  res.status(201).json({ success: true, data: order });
};

export const getAllOrders = (req, res) => {
  res.json({ success: true, data: orders });
};

export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const order = orders.find((o) => o.id === parseInt(id));

  if (!order) {
    return res.status(404).json({
      success: false,
      error: { message: "Order not found" },
    });
  }

  order.status = "topshirildi";

  res.json({ success: true, data: order });
};

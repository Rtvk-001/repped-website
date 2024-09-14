exports.createProduct = async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const image = req.files.image; // Assuming you use `express-fileupload`
  
      // Check for duplicates
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists', success: false });
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image.tempFilePath);
  
      // Create new product
      const newProduct = new Product({
        name,
        price,
        description,
        productURL: result.secure_url
      });
  
      await newProduct.save();
  
      res.status(201).json({
        message: 'Product created successfully',
        success: true,
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', success: false });
      console.error(error);
    }
  };
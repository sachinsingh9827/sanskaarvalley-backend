const paginate = (query) => {
  const page = parseInt(query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(query.limit) || 5; // Default to 10 items per page
  const skip = (page - 1) * limit; // Skips the appropriate number of records

  // Handling sorting based on query (you can customize this)
  const sort = query.sort || { createdAt: -1 }; // Sort by createdAt in descending order by default

  return { skip, limit, sort };
};

module.exports = paginate;

// lib/scholarshipApi.js
const BASE_URL = 'http://localhost:5000/api/scholarships';

// Get all scholarships (with optional query)
export const getAllScholarships = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}?${query}`);
    if (!res.ok) throw new Error('Failed to fetch scholarships');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// // Get scholarship by ID
// export const getScholarshipById = async id => {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`);
//     if (!res.ok) throw new Error('Failed to fetch scholarship');
//     return await res.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Create new scholarship
// export const createScholarship = async data => {
//   try {
//     const res = await fetch(BASE_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || 'Failed to create');
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Update scholarship
// export const updateScholarship = async (id, data) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || 'Failed to update');
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Delete scholarship
// export const deleteScholarship = async id => {
//   try {
//     const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || 'Failed to delete');
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

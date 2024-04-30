const BASE_URL = 'http://localhost:4000/api/graph/';

const saveGraphState = async (userId, graphName, nodes, links, directed) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        graphName,
        nodes,
        links,
        directed,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save graph state');
    }
    return data;
  } catch (error) {
    console.error('Error saving graph state:', error);
    throw error;
  }
};

const getGraphStatesByUserId = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}${userId}`,
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get graph states');
    }
    return data;
  } catch (error) {
    console.error('Error getting graph states:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};

export { saveGraphState, getGraphStatesByUserId };

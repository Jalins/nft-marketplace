export const getTopCreators = (nfts) => {
    const creators = nfts.reduce((creatorObject, nft) => {
      // eslint-disable-next-line no-param-reassign
      (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
  
      return creatorObject;
    }, {});
  
    Object.entries(creators);
  
    return Object.entries(creators).map((creator) => {
      const seller = creator[0];
      const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);
  
      return ({ seller, sum });
    });
  };
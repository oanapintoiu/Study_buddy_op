import React, { useEffect, useState } from 'react';

const SidebarGroups = ({username}) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
      if (username) {
        const fetchData = async () => {
          const response = await fetch(`/users/${username}/groups`);
          const data = await response.json();

          setGroups(data.groups);
      };

      fetchData();
      }
   
    }, [username]);

    if (!groups || groups.length === 0) {
      return <span>No groups yet</span>
    } else {
      return (
        <>
            {groups.map((group) => (
                <a key={group._id} href={`/groups/${group._id}`}>{group.name}</a>
            ))}
        </>
      );
    }
}


export default SidebarGroups;
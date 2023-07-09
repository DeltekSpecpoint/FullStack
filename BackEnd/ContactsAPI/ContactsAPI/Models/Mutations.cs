using ContactsAPI.Data;
using HotChocolate;
using HotChocolate.Types;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class CreateContactMutation
    {
        public async Task<CreateContactPayload> CreateContact([Service] ContactDbContext dbContext, CreateContact input)
        {
            var entity = await dbContext.Contacts.AddAsync(new Data.Entities.Contact()
            {
                Name = input.Name,
                MobileNumber = input.MobileNumber
            });

            await dbContext.SaveChangesAsync();

            return new CreateContactPayload()
            {
                Id = entity.Entity.Id,
                Name = input.Name,
                MobileNumber = input.MobileNumber
            };
        }
    }

    public class CreateContactPayload
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string MobileNumber { get; init; }
    }
}
